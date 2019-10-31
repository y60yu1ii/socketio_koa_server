# Simple koa server template

## Build Docker image

~~~bash
docker build -t koa-server .
~~~

## Run Docker in background

~~~bash
docker run -d -p8080:80 koa-server
~~~

> -d: run in background

## Pack everything

~~~bash 
$ tar -czvf docker.tar Dockerfile app.js index.html package.json
~~~

## Upload & tar -xvf

~~~
 scp -i ../aws.pem docker.tar ec2-user@xxxxxxx.ap-xxx.compute.amazonaws.com:~
~~~
~~~
tar -xvf docker.tar
~~~

## Install docker 

https://docs.aws.amazon.com/zh_tw/AmazonECS/latest/developerguide/docker-basics.html

## Expose port of instance

1. goto EC2 instance setting page 
2. goto security goup 
3. select edit inbound rule
4. expose port needed