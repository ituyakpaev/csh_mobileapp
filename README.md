# cake-school

### Api doc
```
    У проекта есть старая документация, и новая (v2).
    Адрес новой документации:
    https://api.alinamakarova.ru/docs
```

### Stack
```
    vue-cli
    scss
    pug
```

### Developer
```
    Igor Tuyakpaev, +7(967)344-23-55 Telegram
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Build mobile app
```
npm run build:mobile
mv dist mobile/www
cd mobile
cordova prepare ios // android
```
then for android
```
cordova build android 
```
for ios 
```
open file *.xcworkspace in platforms/ios/ and build via xcode
```
