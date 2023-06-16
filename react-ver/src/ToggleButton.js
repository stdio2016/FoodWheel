export function ToggleButton({children, select, onChange}) {
  onChange = onChange || (() => {});
  return (
    <button className={select ? 'selected' : ''} onClick={
      ()=>{
        onChange(!select)
      }
    }>{children}</button>
  );
}

export function ToggleButtonList({list, select, onChange}) {
  select = select || [];
  function handleChange(index, sel) {
    if (sel) select = select.filter(x => x !== index);
    else select = select.concat([index]);
    onChange(select);
  }
  var buttons = list.map((item) => (
    <ToggleButton
      key={item}
      select={select.includes(item)}
      onChange={sel => handleChange(item, !sel)}
    >{item}</ToggleButton>
  ));
  return <div>{buttons}</div>;
}
