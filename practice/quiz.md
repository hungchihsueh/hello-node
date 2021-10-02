程式 1
會跑完 readData 才顯示 after

程式 2
for 迴圈報完後，
idx < 500 ==true
執行 setTimeout，被丟到 html api 執行，結束後再 queue 等待
執行 console.log("after");
剛剛的 setTimeout 被丟回 stack 然後 clear
