export const Manager_DB = [
    {
        id: '/',
        name: '首頁',
        pages: null,
    },
    {
        id: 'Simulation',
        name: '模擬測試',
        pages: null,
    },
    {
        id: 'UserManagement',
        name: '帳戶管理',
        pages: null,
    },
    {
        id: 'Log',
        name: '事件紀錄',
        pages: [
            {
                id: 'AreaEqLog',
                name: '鄉鎮地震事件紀錄'
            },
            {
                id: 'CwbEqLog',
                name: '氣象局地震報告紀錄'
            },
            {
                id: 'SimulationLog',
                name: '模擬發報紀錄'
            }
        ],
        switch: false,
    },
    {
        id: 'System',
        name: '系統設定',
        pages: null,
    },
    {
        id: 'About',
        name: '關於系統',
        pages: null,
    }
]