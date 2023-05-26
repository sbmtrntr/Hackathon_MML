import streamlit as st
import io 

st.title("sample1")

uploaded_file = st.file_uploader('Choose a wav file')

if uploaded_file is not None:
    st.audio(uploaded_file)