import React, { useState, useEffect } from 'react';
import DropDownButton from 'devextreme-react/drop-down-button';

//style
import './zmiennikKoloru.scss';

export const ZmiennikKoloru = ({ toggleTheme }) => {
  const [valueFromStorage, setValueFromStorage] = useState('');

  const onOptionClick = (e) => {
    if (valueFromStorage === 'material.blue.dark' && e.itemData === 'Ciemny') {
      return;
    } else if (
      valueFromStorage === 'material.blue.light' &&
      e.itemData === 'Jasny'
    ) {
      return;
    } else {
      toggleTheme();
      setValueFromStorage(window.localStorage.getItem('dx-theme'));
    }
  };

  useEffect(() => {
    setValueFromStorage(window.localStorage.getItem('dx-theme'));
    // onOptionClick({ e: { itemData: 'Ciemny' } });
  }, []);

  return (
    <div className="zmiennikKoloru">
      <DropDownButton
        text="Przełącz kolor"
        icon="fill"
        dropDownOptions={{ width: 230 }}
        items={['Ciemny', 'Jasny']}
        onItemClick={onOptionClick}
      />
    </div>
  );
};

export default ZmiennikKoloru;
