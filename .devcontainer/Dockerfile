FROM python:3.8

RUN apt update && apt upgrade -y
RUN apt install -y libgl1-mesa-dev
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

ENTRYPOINT [ "streamlit" ]

CMD [ "hello" ]

EXPOSE 8501