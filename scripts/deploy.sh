npm run build
git add .
git commit -m 'update'
git push origin master
ssh root@zhengjianfeng.cn "cd /data/xinyou/ui-src/api-man-ui && git pull origin master"