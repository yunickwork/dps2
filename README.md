# DPS UI - 地震預警副站

本專案為地震預警副站的用戶界面，提供即時地震預警信息。

## Docker

要使用 Docker 運行本應用程序，請運行以下命令：

```
docker run -p 3000:3000 --restart=always -v /home/dps/app:/app --name frontend yunick0215/dps
```

這將使用 yunick0215/dps 映像運行應用程序，並將其綁定到主機上的 3000 端口。同時，應用程序資料將保持在 /home/dps/app 目錄中。

## Build Production

要為生產環境構建應用程序，請運行以下命令：

```
npm run build
```

這將生成適用於生產環境的應用程序。

## 部署生產環境

將構建的應用程序推送到 `/home/dps/app` 目錄：

```
cp -r build/* /home/dps/app
```

現在應用程序已成功部署到生產環境。