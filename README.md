# umi project

## Example
[单词记忆器](http://1.117.173.27/)

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## Docker

```shell
# build docker
sudo docker build --force-rm -t word-remember:latest .

# run docker 
sudo docker run -dit -p 8001:8001 -v ./nginx.conf:/etc/nginx/nginx.conf --name word-remember word-remember:latest  
```