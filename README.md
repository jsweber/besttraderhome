# besttraderhome
supervisor  用于监听文件改变后重启服务器，方便开发

//要监控的文件夹或js文件，默认为'.'
-w|—watch
//要忽略监控的文件夹或js文件  
-i|—ignore
//监控文件变化的时间间隔（周期），默认为Node.js内置的时间
-p|—poll-interval
//要监控的文件扩展名，默认为'node|js'
-e|—extensions
//要执行的主应用程序，默认为'node'
-x|—exec
//开启debug模式（用—debug flag来启动node）
—debug
//安静模式，不显示DEBUG信息
-q|—quiet

