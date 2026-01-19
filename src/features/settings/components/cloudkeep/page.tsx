import React, { useState, useEffect } from 'react';

interface SecurityLogEntry {
  timestamp: string;
  event: string;
  severity: 'info' | 'warning' | 'danger';
}
type UnlockMethod = 'password' | 'system';
export const CloudKeepSettings: React.FC = () => {
  // Storage Mode

  // Encryption
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Access Control
  const [appLockEnabled, setAppLockEnabled] = useState(true);
  const [autoLockTimeout, setAutoLockTimeout] = useState('5');
  const [unlockMethod, setUnlockMethod] = useState<UnlockMethod>('password');
  const [lastUnlockedTime] = useState('Just now');

  // Backup & Recovery
  const [backupsEnabled, setBackupsEnabled] = useState(true);
  const [backupLocation, setBackupLocation] = useState('/secure/backups');
  const [lastBackupTime, setLastBackupTime] = useState('2023-11-15 14:30 UTC');

  // Data Lifecycle
  const [secureDelete, setSecureDelete] = useState(true);
  const [failedAttemptsWipe, setFailedAttemptsWipe] = useState('5');
  const [clearClipboard, setClearClipboard] = useState(true);
  const [memoryWipeOnClose, setMemoryWipeOnClose] = useState(false);

  // Permissions & Visibility
  const [allowScreenshots, setAllowScreenshots] = useState(false);
  const [hideInAppSwitcher, setHideInAppSwitcher] = useState(true);
  const [maskSensitiveNotes, setMaskSensitiveNotes] = useState(true);

  // Security Log
  const [securityLog, setSecurityLog] = useState<SecurityLogEntry[]>([
    { timestamp: '2023-11-15 14:30', event: 'Encrypted backup created', severity: 'info' },
    { timestamp: '2023-11-15 10:15', event: 'App unlocked via password', severity: 'info' },
    { timestamp: '2023-11-14 16:45', event: 'Failed unlock attempt blocked', severity: 'warning' },
  ]);

  // Calculate password strength
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (newPassword.length >= 8) strength++;
    if (newPassword.length >= 12) strength++;
    if (/[A-Z]/.test(newPassword)) strength++;
    if (/[0-9]/.test(newPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++;

    setPasswordStrength(Math.min(strength, 5));
  }, [newPassword]);

  const handleCreateBackup = () => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
    setLastBackupTime(timestamp);

    // Add to security log
    setSecurityLog(prev => [
      {
        timestamp,
        event: "Manual encrypted backup created",
        severity: "info" as const,
      },
      ...prev,
    ].slice(0, 10));
  }
  const handleRestoreBackup = () => {
    if (!window.confirm('Restoring from backup will replace all current data. This action cannot be undone. Continue?')) {
      return;
    }

    // Add to security log
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
    setSecurityLog(prev => [
      { timestamp, event: 'Backup restoration initiated', severity: 'warning' },
      ...prev
    ]);
  };

  const handleRevokeSessions = () => {
    if (!window.confirm('This will sign out all devices and require re-authentication on next access. Continue?')) {
      return;
    }

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
    setSecurityLog(prev => [
      { timestamp, event: 'All sessions revoked', severity: 'warning' },
      ...prev
    ]);
  };

  const handleDisableEncryption = () => {
    const confirmMessage = "⚠️ CRITICAL WARNING ⚠️\n\n" +
      "Disabling encryption will store your data in plain text.\n" +
      "This is HIGHLY INSECURE and should only be done temporarily for debugging.\n\n" +
      "Type 'DISABLE SECURE' to confirm:";

    const userInput = window.prompt(confirmMessage);
    if (userInput === 'DISABLE SECURE') {
      setEncryptionEnabled(false);
      setSecurityLog(prev => [
        {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
          event: 'ENCRYPTION DISABLED - DATA IS NOW UNSECURE',
          severity: 'danger'
        },
        ...prev
      ]);
    }
  };

  const handleWipeAllData = () => {
    const confirmMessage = "☢️ PERMANENT DATA DESTRUCTION ☢️\n\n" +
      "This will PERMANENTLY DELETE ALL your stored data, backups, and encryption keys.\n" +
      "This action is IRREVERSIBLE and COMPLETE.\n\n" +
      "Type 'DELETE EVERYTHING' to confirm:";

    const userInput = window.prompt(confirmMessage);
    if (userInput === 'DELETE EVERYTHING') {
      // Add to security log before wiping
      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
      setSecurityLog(prev => [
        {
          timestamp,
          event: 'ALL DATA PERMANENTLY WIPED',
          severity: 'danger'
        },
        ...prev
      ]);

      alert('All data has been permanently deleted. The application will now close.');
      // In a real app, this would trigger the actual wipe
    }
  };

  const handleExportSecurityLog = () => {
    const logText = securityLog.map(entry =>
      `[${entry.timestamp}] ${entry.severity.toUpperCase()}: ${entry.event}`
    ).join('\n');

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cloudkeep-security-log-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Password strength color calculation
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 text-stone-100">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4">
        <h1 className="text-2xl font-semibold text-stone-200">Secure Storage Settings</h1>
        <p className="text-stone-200 mt-1">
          Control how your data is stored, encrypted, and protected
        </p>
      </div>


      {/* 2. ENCRYPTION */}
      <section className="space-y-4">
        <fieldset className="border border-neutral-800 rounded-lg p-6 bg-gray-950">
          <legend className="text-lg font-semibold px-2">Encryption</legend>
          <p className="text-stone-200 mb-4">Control how your data is encrypted at rest</p>

          <div className="space-y-6">
            {/* Encryption Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Enable encryption at rest</span>
                <p className="text-sm text-stone-200">Data is encrypted before being stored</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={encryptionEnabled}
                  onChange={(e) => setEncryptionEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border border-neutral-800-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {!encryptionEnabled && (
              <div className="bg-yellow-50 border-neutral-800 border border-neutral-800-yellow-200 rounded p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Encryption is disabled.</strong> Your data is stored in plain text and vulnerable to unauthorized access.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Encryption Method (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-stone-200 mb-1">
                Encryption method
              </label>
              <input
                type="text"
                value="AES-256-GCM"
                readOnly
                className="w-full px-3 py-2 border-neutral-800  rounded bg-black text-stone-200"
              />
              <p className="text-sm text-stone-200 mt-1">
                Industry-standard encryption with authenticated encryption
              </p>
            </div>

            {/* Change Password */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-200 mb-1">
                  New encryption password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border-neutral-800 border rounded focus:ring-2 focus:ring-blue-500 focus:border border-neutral-800-blue-500"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-200 mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-800 border-neutral-800-neutral-800 rounded focus:ring-2 focus:ring-blue-500 focus:border border-neutral-800-blue-500"
                  placeholder="Re-enter password"
                />
              </div>

              {/* Password Strength Indicator */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-stone-200">Password strength</span>
                  <span className="font-medium">
                    {passwordStrength <= 1 ? 'Weak' : passwordStrength <= 3 ? 'Fair' : 'Strong'}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded overflow-hidden">
                  <div
                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                    style={{ width: `${passwordStrength * 20}%` }}
                  ></div>
                </div>
                <p className="text-sm text-stone-200 mt-1">
                  Use at least 12 characters with mixed case, numbers, and symbols
                </p>
              </div>
            </div>
          </div>
        </fieldset>
      </section>

      {/* 3. ACCESS CONTROL */}
      <section className="space-y-4">
        <fieldset className="border border-neutral-800 rounded-lg p-6 bg-gray-950">
          <legend className="text-lg font-semibold px-2">Access Control</legend>
          <p className="text-stone-200 mb-4">Control how the app is locked and accessed</p>

          <div className="space-y-6">
            {/* App Lock Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">App lock enabled</span>
                <p className="text-sm text-stone-200">Require authentication to open the app</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={appLockEnabled}
                  onChange={(e) => setAppLockEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border border-neutral-800-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Auto-lock Timeout */}
            <div>
              <label className="block text-sm font-medium text-stone-200 mb-1">
                Auto-lock timeout
              </label>
              <select
                value={autoLockTimeout}
                onChange={(e) => setAutoLockTimeout(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-800 rounded focus:ring-2 focus:ring-blue-500 focus:border border-neutral-800-blue-500"
              >
                <option value="0">Immediately</option>
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
              </select>
              <p className="text-sm text-stone-200 mt-1">
                App automatically locks after this period of inactivity
              </p>
            </div>

            {/* Unlock Method */}
            <div>
              <label className="block text-sm font-medium text-stone-200 mb-3">
                Unlock method
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="unlockMethod"
                    value="password"
                    checked={unlockMethod === 'password'}
                    onChange={(e) => setUnlockMethod(e.target.value as UnlockMethod)}
                    className="h-4 w-4"
                  />
                  <span>Password</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="unlockMethod"
                    value="system"
                    checked={unlockMethod === 'system'}
                    onChange={(e) => setUnlockMethod(e.target.value as UnlockMethod)}
                    className="h-4 w-4"
                    disabled={!('credentials' in navigator)} // Simplified check
                  />
                  <span className={!('credentials' in navigator) ? 'text-gray-400' : ''}>
                    System authentication (biometric/Windows Hello)
                    {!('credentials' in navigator) && ' (Not available on this device)'}
                  </span>
                </label>
              </div>
            </div>

            {/* Last Unlocked Time */}
            <div>
              <label className="block text-sm font-medium text-stone-200 mb-1">
                Last unlocked
              </label>
              <input
                type="text"
                value={lastUnlockedTime}
                readOnly
                className="w-full px-3 py-2 border border-neutral-800 rounded bg-gray-950 text-stone-200"
              />
              <p className="text-sm text-stone-200 mt-1">
                Timestamp of the last successful unlock
              </p>
            </div>
          </div>
        </fieldset>
      </section>

      {/* 4. BACKUP & RECOVERY */}
      <section className="space-y-4">
        <fieldset className="border border-neutral-800 rounded-lg p-6 bg-gray-950">
          <legend className="text-lg font-semibold px-2">Backup & Recovery</legend>
          <p className="text-stone-200 mb-4">Manage encrypted backups of your data</p>

          <div className="space-y-6">
            {/* Backup Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Allow encrypted backups</span>
                <p className="text-sm text-stone-200">Create secure backups of your encrypted data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={backupsEnabled}
                  onChange={(e) => setBackupsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border border-neutral-800-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Backup Location */}
            <div>
              <label className="block text-sm font-medium text-stone-200 mb-1">
                Backup location
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={backupLocation}
                  onChange={(e) => setBackupLocation(e.target.value)}
                  className="flex-1 px-3 py-2 border border-neutral-800 rounded focus:ring-2 focus:ring-blue-500 focus:border border-neutral-800-blue-500"
                  placeholder="/path/to/backups"
                />
                <button className="px-4 py-2 border border-neutral-800 rounded hover:bg-gray-950">
                  Browse
                </button>
              </div>
              <p className="text-sm text-stone-200 mt-1">
                Backups are encrypted and can only be restored with your password
              </p>
            </div>

            {/* Backup Actions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <button
                  onClick={handleCreateBackup}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create Manual Backup
                </button>
                <p className="text-sm text-stone-200 mt-1">
                  Create an immediate encrypted backup
                </p>
              </div>

              <div>
                <button
                  onClick={handleRestoreBackup}
                  className="w-full px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Restore from Backup
                </button>
                <p className="text-sm text-stone-200 mt-1">
                  Replace current data with backup (irreversible)
                </p>
              </div>
            </div>

            {/* Last Backup Time */}
            <div>
              <label className="block text-sm font-medium text-stone-200 mb-1">
                Last backup
              </label>
              <input
                type="text"
                value={lastBackupTime}
                readOnly
                className="w-full px-3 py-2 border border-neutral-800 rounded bg-gray-950 text-stone-200"
              />
              <p className="text-sm text-stone-200 mt-1">
                Timestamp of the most recent backup
              </p>
            </div>
          </div>
        </fieldset>
      </section>

      {/* 5. DATA LIFECYCLE */}
      <section className="space-y-4">
        <fieldset className="border border-neutral-800 rounded-lg p-6 bg-gray-950">
          <legend className="text-lg font-semibold px-2">Data Lifecycle</legend>
          <p className="text-stone-200 mb-4">Control how data is handled during operations</p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Secure Delete */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Secure delete on removal</span>
                  <p className="text-sm text-stone-200">Overwrite data before deletion</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={secureDelete}
                    onChange={(e) => setSecureDelete(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border border-neutral-800-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Auto-wipe after failed attempts */}
              <div>
                <label className="block text-sm font-medium text-stone-200 mb-1">
                  Auto-wipe after failed attempts
                </label>
                <select
                  value={failedAttemptsWipe}
                  onChange={(e) => setFailedAttemptsWipe(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-800  rounded focus:ring-2 focus:ring-blue-500 focus:border border-neutral-800-blue-500"
                >
                  <option value="3">3 attempts</option>
                  <option value="5">5 attempts</option>
                  <option value="10">10 attempts</option>
                </select>
              </div>

              {/* Clear Clipboard */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Clear clipboard after copy</span>
                  <p className="text-sm text-stone-200">Remove sensitive data from clipboard</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clearClipboard}
                    onChange={(e) => setClearClipboard(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border border-neutral-800-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Memory Wipe */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Memory wipe on app close</span>
                  <p className="text-sm text-stone-200">Securely clear memory on exit</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={memoryWipeOnClose}
                    onChange={(e) => setMemoryWipeOnClose(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border border-neutral-800-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </section>

      {/* 6. PERMISSIONS & VISIBILITY */}
      <section className="space-y-4">
        <fieldset className="border border-neutral-800 rounded-lg p-6 bg-gray-950">
          <legend className="text-lg font-semibold px-2">Permissions & Visibility</legend>
          <p className="text-stone-200 mb-4">Control app visibility and data exposure</p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Allow app screenshots</span>
                  <p className="text-sm text-stone-200">Allow system screenshots of the app</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowScreenshots}
                    onChange={(e) => setAllowScreenshots(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border border-neutral-800-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Hide content in app switcher</span>
                  <p className="text-sm text-stone-200">Blur app content when switching apps</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hideInAppSwitcher}
                    onChange={(e) => setHideInAppSwitcher(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border border-neutral-800-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Mask sensitive notes by default</span>
                  <p className="text-sm text-stone-200">Show content as ••••• unless revealed</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maskSensitiveNotes}
                    onChange={(e) => setMaskSensitiveNotes(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border border-neutral-800-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </section>

      {/* 7. AUDIT & TRANSPARENCY */}
      <section className="space-y-4">
        <fieldset className="border border-neutral-800 rounded-lg p-6 bg-gray-950">
          <legend className="text-lg font-semibold px-2">Audit & Transparency</legend>
          <p className="text-stone-200 mb-4">View security events and logs</p>

          <div className="space-y-6">
            {/* Last Security Event */}
            <div>
              <label className="block text-sm font-medium text-stone-200 mb-1">
                Last security event
              </label>
              <input
                type="text"
                value={securityLog[0]?.event || 'No events'}
                readOnly
                className="w-full px-3 py-2 border border-neutral-800  rounded bg-gray-950 text-stone-200"
              />
              <p className="text-sm text-stone-200 mt-1">
                {securityLog[0]?.timestamp || ''}
              </p>
            </div>

            {/* Security Log Actions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <button
                  onClick={() => {/* Would open log modal */ }}
                  className="w-full px-4 py-2 border border-neutral-800  rounded hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Show Security Log
                </button>
                <p className="text-sm text-stone-200 mt-1">
                  View all security events
                </p>
              </div>

              <div>
                <button
                  onClick={handleExportSecurityLog}
                  className="w-full px-4 py-2 border border-neutral-800  rounded hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Export Security Log
                </button>
                <p className="text-sm text-stone-200 mt-1">
                  Download log as text file
                </p>
              </div>
            </div>
          </div>
        </fieldset>
      </section>

      {/* 8. DANGER ZONE */}
      <section className="space-y-4">
        <fieldset className="border border-red-300 rounded-lg p-6 bg-gray-950">
          <legend className="text-lg font-semibold px-2 text-red-700">Danger Zone</legend>
          <p className="text-red-600 mb-4">Irreversible actions that affect security and data</p>

          <div className="space-y-4">
            {/* Revoke Sessions */}
            <div className="p-4 border border-red-200 rounded bg-gray-950">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-red-700">Revoke all sessions</h3>
                  <p className="text-sm text-red-600 mt-1">
                    Sign out all devices. All users will need to re-authenticate.
                  </p>
                </div>
                <button
                  onClick={handleRevokeSessions}
                  className="px-4 py-2border border-red-600 text-red-600 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Revoke Sessions
                </button>
              </div>
            </div>

            {/* Disable Encryption */}
            <div className="p-4 border border-red-200 rounded bg-gray-950">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-red-700">Disable encryption</h3>
                  <p className="text-sm text-red-600 mt-1">
                    ⚠️ Data will be stored in plain text. Extremely insecure.
                  </p>
                </div>
                <button
                  onClick={handleDisableEncryption}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Disable Encryption
                </button>
              </div>
            </div>

            {/* Wipe All Data */}
            <div className="p-4 border border-red-500 rounded bg-gray-950">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-red-700">Permanently wipe all data</h3>
                  <p className="text-sm text-red-600 mt-1">
                    ☢️ This will permanently delete ALL data, backups, and keys. This action is COMPLETELY IRREVERSIBLE.
                  </p>
                </div>
                <button
                  onClick={handleWipeAllData}
                  className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Wipe All Data
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </section>

      {/* Footer Note */}
      <div className="pt-4 border-neutral-800 border-t text-center">
        <p className="text-sm text-stone-200">
          Changes are saved automatically. Some settings require app restart.
        </p>
      </div>
    </div>
  );
}
