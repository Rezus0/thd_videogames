import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GameList from "./game/GameList";
import ReqList from "./req/ReqList";
import "./styles/MainPage.css"
import DateList from "./date/DateList";
import TimeList from "./time/TimeList";
import DevList from "./developer/DevList";
import PubList from "./publisher/PubList";
import ReleasedGamesList from "./released_game/ReleasedGamesList";
import UserList from "./user/UserList";
import StoreList from "./store/StoreList";
import UserAuthDataList from "./user_auth_data/UserAuthDataList";
import SoldGameForm from "./sold_game/SoldGameForm";
import SoldGameList from "./sold_game/SoldGameList";
import UserGameDataList from "./user_game_data/UserGameDataList";
import PurchaseForm from "./purchase/PurchaseForm";
import PurchaseList from "./purchase/PurchaseList";

const MainPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (index) => {
        setSelectedTab(index);
    };

    return (
        <div className="main-container">
            <Tabs className="tabs l-tabs" selectedIndex={selectedTab} onSelect={handleTabChange}>
                <TabList className="tabs__titles" activeTabClassName="tabs__titles__title l-tabs__tab--selected">
                    <Tab className="tabs__titles__title">Games</Tab>
                    <Tab className="tabs__titles__title">Requirements</Tab>
                    <Tab className="tabs__titles__title">Date</Tab>
                    <Tab className="tabs__titles__title">Time</Tab>
                    <Tab className="tabs__titles__title">Developers</Tab>
                    <Tab className="tabs__titles__title">Publishers</Tab>
                    <Tab className="tabs__titles__title">Released Games</Tab>
                    <Tab className="tabs__titles__title">Users</Tab>
                    <Tab className="tabs__titles__title">Stores</Tab>
                    <Tab className="tabs__titles__title">User Auth Data</Tab>
                    <Tab className="tabs__titles__title">Sold Games</Tab>
                    <Tab className="tabs__titles__title">User Game Data</Tab>
                    <Tab className="tabs__titles__title">Purchases</Tab>
                </TabList>

                <TabPanel className="tabs__contents__content">
                    <GameList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <ReqList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <DateList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <TimeList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <DevList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <PubList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <ReleasedGamesList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <UserList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <StoreList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <UserAuthDataList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <SoldGameList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <UserGameDataList />
                </TabPanel>

                <TabPanel className="tabs__contents__content">
                    <PurchaseList />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default MainPage;
