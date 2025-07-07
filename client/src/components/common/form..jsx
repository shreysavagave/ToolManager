

function CommonForm({ formControls , formData, setFormData , onSubmit, buttonText}) {


  function renderItemsbyComponentType(getControlItem) {

    let value = formData[getControlItem.name] || ""
    let element = null;
    switch (getControlItem.componentType) {
      case 'input':
        element = (
          <input className="w-full outline-none"
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]:event.target.value
              })
            }
          />
        );
        break;

      case 'Select':
        element = (
          <Select
          className="w-full outline-none"
          onValueChange={(value)=>setFormData({
            ...formData,
            [getControlItem.name] : value
          })} 
          value={value} >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>

            <SelectContent>
              {
                getControlItem.options && getControlItem.opitons.length > 0 ?
                  getControlItem.opitons.map(optionItem => 
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                ) : null
              }
            </SelectContent>
          </Select>
        )
        break;
      case 'textarea':
        element = (
          <textarea className="w-full outline-none"
          value={value}
          name={getControlItem.name}
          placeholder={getControlItem.placeholder}
          id={getControlItem.id}
          onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]:event.target.value
              })
            }
          />
        );
        break;

      default:
        element = (
          <input className="w-full outline-none"
            value = {value}
            name={getControlItem.name}
            plceholder={getControlItem.plceholder}
            id={getControlItem.name}
            type={getControlItem.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]:event.target.value
              })
            }
          />
        );
        break;
    }
    return element
  }
  return (
    <form onSubmit={onSubmit} >
      <div className="flex flex-col gap-3">
        {
          formControls.map(controlItem =>
            <div className="w-full gap-1.5" key={controlItem.name}>
              <label className="">{controlItem.label}</label>
              <div className=" border-1 w-full p-1 " >
              {
                
                renderItemsbyComponentType(controlItem)
              }
              </div>
            </div>
          )
        }

      </div>

      <button className="mt-3 bg-black w-full text-white text-center p-1" type="submit" >{buttonText || "Submit"}</button>
    </form>
  );
}

export default CommonForm;