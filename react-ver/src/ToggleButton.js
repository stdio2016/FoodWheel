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
  select = select || new Set();
  function handleChange(index, sel) {
    select = new Set(select);
    if (sel) select.delete(index);
    else select.add(index);
    onChange(select);
  }
  var buttons = list.map((item) => (
    <ToggleButton
      key={item}
      select={select.has(item)}
      onChange={sel => handleChange(item, !sel)}
    >{item}</ToggleButton>
  ));
  return <div>{buttons}</div>;
}
