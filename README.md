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
docker run -d --rm -p 8001:80 --name word-remember word-remember
```