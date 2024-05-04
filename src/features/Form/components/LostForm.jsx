import React from 'react'
import '../styles/LostForm.css'

const LostForm = () => {
  return (
   <>
    <div class = "container">
      <h1 class = "title">
        落とし物追加フォーム
      </h1>
      <div class = "columns">
        <div class = "column is-6">
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="photo" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">画像を選択</span>
              </span>
            </label>
          </div>    
        </div>
        <div class = "column is-6">
          <h2 class = "info">LOST PROPERTY</h2>
          <div class="field">
            <div class="control">
              <input class="input" type="text"/>
            </div>
          </div>
          <h2 class = "info">PLACE</h2>
          <div class="field">
            <div class="control">
              <input class="input" type="text"/>
            </div>
          </div>
          <h2 class = "info">PIN COLOR</h2>
          <div class="field">
            <div class="control">
              <div class="select">
                <select>
                  <option>赤</option>
                  <option>黄</option>
                  <option>緑</option>
                  <option>青</option>
                  <option>桃</option>
                  <option>紫</option>
                </select>
              </div>
            </div>
          </div>
          <h2 class = "info">DETAIL</h2>
          <div class="field">
            <div class="control">
              <input class="input" type="text"/>
            </div>
          </div>
        </div>    
      </div>
    </div>
   
   </>
  )
}

export default LostForm
