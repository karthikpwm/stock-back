
const app = require('./app');
app.listen( process.env.PORT || 3000, () => {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    console.log("Server listen");
})
// 3306
// 80
// 80000