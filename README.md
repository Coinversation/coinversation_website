# coinversation

## Node version

v12.22.5

## how to run

```
npm i

npm run start

npm run build
```

- 1. 获取所有正在质押的链及数据 done

- 1. 链接波卡钱包 done
- 2. 质押 DOT 到波卡钱包（CTO 平行链拍卖质押） 功能好 未测
- 3. 监听当前质押总数，并相对应的展示奖励的 CTO 总量
- 4. 监听当前质押成功的地址和数量
- 5. 实时展示当前账号所瓜分的 CTO 量【1. 当前地址质押数；2. 质押总数；3. CTO 奖励总量】
- 6. 倒计时：

  - 6.1 半小时内是否有新的 DOT 质押，没有就获得 50% 的奖励
  - 6.2 如果获得 50%奖励，UI 是否更新
  - 6.2 如果半小时有新的区块产生，倒计时重置

- 2021-12-07

1. 获取最后质押区块 down
2. 获取当前波卡区块 down
3. (6000-(当前波卡区块-最后质押区块))\*6000 倒计时 down
4. 监听链质押 down

- 排行榜更新 down
- 倒计时重新计算 down
- 最后 List of winners

5. cto 汇率计算

6. Comdivletion Block 提示文案
7. Countdown 提示文案
8. Reward rules 超链接
9. Block height 提示文案
