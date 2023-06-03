FROM httpd:latest

USER root

COPY requirements.txt requirements.txt
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

RUN apt update && apt upgrade -y
RUN apt install -y libgl1-mesa-dev libglib2.0-0 git
RUN apt install -y cmake
RUN apt install -y build-essential
RUN apt install -y libx11-dev
RUN apt install -y libopenblas-dev liblapack-dev
RUN apt install -y python3-pip

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

EXPOSE 80