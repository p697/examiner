import React from 'react';
import {
  Tabs,
} from 'antd';
import FreshKeyList from './fresh_key_list/fresh_key_list'
import FinishKeyList from './finish_key_list/finish_key_list'

import './index.scss';

const { TabPane } = Tabs;

export default () => {


  return (
    <div className="checkdone">
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="已验证密钥" key="1">
          <FinishKeyList />
        </TabPane>
        <TabPane tab="未验证密钥" key="2">
          <FreshKeyList />
        </TabPane>
      </Tabs>
    </div>
  );
}

