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
          {/*後ほど写真フォーム追加*/}    
        </div>
        <div class = "column is-6">
          <h2>LOST PROPERTY</h2>
          <div class="field">
            <div class="control">
              <input class="input" type="text"/>
            </div>
          </div>
          <h2>PLACE</h2>
          <div class="field">
            <div class="control">
              <input class="input" type="text"/>
            </div>
          </div>
          <h2>PIN COLOR</h2>
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
          <h2>DETAIL</h2>
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
