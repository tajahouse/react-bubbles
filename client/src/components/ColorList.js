import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../axiosWithAuth";
import { useInput } from "../components/useInput"

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [createColor, setCreateColor, handleCreateColor] = useInput('');
  const [hexCode, setHexCode, handleHexCode] = useInput('');



  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const body = {...colorToEdit}
  const id = colorToEdit.id
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${id}`, body)
    .then(res => {
      console.log(res);
      updateColors(colors.map(i => i.id === id? colorToEdit: i))
    })
    .catch(err =>{
      console.log("Naw girl!", err)
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res=>{
      console.log(res);
      window.location.reload()

    })
    .catch(err =>{
      console.log("Naw girl!", err)
    })
  };

  const addColor = (e, color) =>{
    e.preventDefault();
    setAdding(true);
    setCreateColor(color);
    setHexCode(color);

    const data = {
      color: createColor,
      code: {hex: hexCode}
    }

    axiosWithAuth()
    .post("/api/colors", data)
    .then(res => {
      console.log("Add",res);
      updateColors(res.data)
    })
    .catch(err =>{
      console.log("Naw girl!", err)
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />

      {adding && 
      (<form onSubmit={addColor}>
        {console.log('Adding',adding)}
        <legend>add color</legend>
        <input type="text" name="colorName" value={createColor} onChange={handleCreateColor}/>
        <input type="text" name="hexCode" value={hexCode} onChange={handleHexCode}/>
        <input type="submit"/>
      </form>
      )}
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
