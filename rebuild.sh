git pull
if [ $? -eq 0 ]; then
     npm i -prod && npm run build
     if [ $? -eq 0]; then
        docker build -t word-remember:latest .
        if [ $? -eq 0]; then
            echo "build successed"
            echo "you can commad 'docker run -d --rm -p 8001:80 --name word-remember word-remember'"
     else
        echo "npm error"
else
     echo "git failed"
fi

