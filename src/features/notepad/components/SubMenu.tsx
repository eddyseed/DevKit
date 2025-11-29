import styles from '@/styles/tools/notepad.module.css';
const SubMenu: React.FC = () => {

    return (
        <div className={`${styles.submenu} w-11/12 h-4/5 rounded-sm preset-1 grid px-3 py-1.5 grid-cols-2 space-x-1.5`}>
            <div className={`bg-muted rounded-sm`}>Current File</div>
            <div className={`rounded-sm`}>All Files</div>
        </div>
    );
};


export default SubMenu;