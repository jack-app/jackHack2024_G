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
          <h2>左に表示したい</h2>       
        </div>
        <div class = "column is-6">
          <h2>
            右に表示したい
          </h2>
        </div>    
      </div>

    </div>
   
   </>
  )
}

export default LostForm
