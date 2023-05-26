##########################################################################
# 必要なライブラリをインポート
##########################################################################


import streamlit as st
from streamlit_webrtc import webrtc_streamer
import cv2
import av

# パラメータの設定ファイルをインポート
from params import *



##########################################################################
# 関数を定義
##########################################################################

# video_frameに対して行うコールバック関数
def video_frame_callback(frame):
    img = frame.to_ndarray(format="bgr24")
    flipped = img[::-1, :, :]
    return av.VideoFrame.from_ndarray(flipped, format="bgr24")




##########################################################################
# シーンの定義
##########################################################################

# タイトルシーン
def scene_title():
    title = st.title(GAME_TITLE)
    button = st.button(label="press to start!")
    if button:
        st.session_state.scene = "gameplay"
        st.experimental_rerun() # これ入れないとボタンを2回押さないとシーン遷移しない

# ゲームシーン
def scene_gameplay():
    webrtc_obj = webrtc_streamer(key="example", video_frame_callback=video_frame_callback)
    button = st.button(label="press to finish!")
    if button:
        st.session_state.scene = "result"
        st.experimental_rerun() # これ入れないとボタンを2回押さないとシーン遷移しない

# 結果表示シーン
def scene_result():
    result = st.write(RESULT)
    button = st.button(label="press to title!")
    if button:
        st.session_state.scene = "title"
        st.experimental_rerun() # これ入れないとボタンを2回押さないとシーン遷移しない

##########################################################################
# main部分
##########################################################################

#ゲーム内変数の初期化、st.session_stateで管理する
if "scene" not in st.session_state:
    st.session_state.scene = "title"

# コンポーネントの表示
# タイトル
if st.session_state.scene == "title":
    scene_title()

# ゲーム画面
elif st.session_state.scene == "gameplay":
    scene_gameplay()

# 結果表示
elif st.session_state.scene == "result":
    scene_result()
