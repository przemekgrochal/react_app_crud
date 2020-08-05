import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from 'react';

// dev-extreme
import 'devextreme/data/odata/store';
import {
  Column,
  Editing,
  Form,
  Popup,
  Position
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { NumberBox } from 'devextreme-react/number-box';
import TextBox from 'devextreme/ui/text_box';

// components
import XDataGrid from '../../../../components/XDataGrid/XDataGrid';

// api
import { cennikiDataSource } from '../../../../api/cenniki';
import { walutyDataSource } from '../../../../api/waluty';

// styles
import './cenniki.scss';

// redux
import { useSelector } from 'react-redux';

const dataSource = cennikiDataSource();
const walutySource = walutyDataSource();

const positionEditorOptions = {
  value: '',
  itemTemplate: 'selectBoxItem'
};

const Cenniki = () => {
  const [heightDlaGrid, setHeightDlaGrid] = useState(0);
  const [inputPLN, setInputPLN] = useState(0);
  const sectionRef = useRef(null);
  const [calculatedWaluta, setCalculatedWaluta] = useState({});

  const [name, setName] = useState({});
  const [opis, setOpis] = useState({});
  const [cenaMDP, setCenaMDP] = useState({});
  const [cenaMDK, setCenaMDK] = useState({});
  const [zaokrW, setZakokrW] = useState({});

  const getEnumZaokraglenia = useSelector(
    (state) => state.ceny_definicje_ZaokraglenieSposobTyp
  );

  const handleInput = (e) => {
    setInputPLN(e.value);
  };

  const calculateWalute = () => {
    // fetch(`${process.env.REACT_APP_API_PATH}/api/cenniki/obliczCene`, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type" : 'application/json'
    //   }
    //   body: JSON.stringify(data)
    // })
    //   .then((data) => data.json())
    //   .then((data) => {
    //     setCalculatedWaluta(data);
    //   })
    //   .catch((error) => {
    //     console.log('eror: ', error);
    //   });
  };

  useEffect(() => {
    setHeightDlaGrid(sectionRef.current.clientHeight);
  }, []);

  // console.log('name', name);
  // console.log('opis', opis);
  // console.log('cenaMDP', cenaMDP);
  // console.log('cenaMDK', cenaMDK);
  // console.log('zaokrW', zaokrW);
  console.log('getEnumZaokraglenia', getEnumZaokraglenia);

  return (
    <section className="cenniki" ref={sectionRef}>
      <XDataGrid heightDlaGrid={heightDlaGrid} dataSource={dataSource}>
        <Editing allowAdding allowUpdating allowDeleting mode="popup">
          <Popup title="Dodawanie Cennika" showTitle width={1000} height={625}>
            <Position my="center" at="center" of={window} />
          </Popup>
          <Form colCount={2}>
            <Item itemType="group">
              <Item
                dataField="Nazwa"
                validationRules={[{ type: 'required' }]}
                editorOptions={{
                  showClearButton: true
                  // onValueChanged: ({ value }) => setName(value)
                }}
              />
              <Item
                dataField="Opis"
                validationRules={[{ type: 'required' }]}
                editorType="dxTextArea"
                editorOptions={{
                  showClearButton: true
                  // onValueChanged: ({ value }) => setOpis(value)
                }}
              />
              <Item
                dataField="WalutaId"
                label={{ text: 'Waluty' }}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: walutySource,
                  displayExpr: 'Nazwa',
                  text: 'Ddsa',
                  valueExpr: 'Id'
                }}
                validationRules={[{ type: 'required' }]}
              />
              <Item
                dataField="CenaModyfikacjaProcent"
                validationRules={[{ type: 'required' }]}
                editorOptions={{
                  showClearButton: true
                  // onValueChanged: ({ value }) => setCenaMDP(value)
                }}
              />
              <Item
                dataField="CenaModyfikacjaKwota"
                validationRules={[{ type: 'required' }]}
                editorOptions={{
                  showClearButton: true
                  // onValueChanged: ({ value }) => setCenaMDK(value)
                }}
              />
              <Item
                dataField="ZaokraglenieWspolczynik"
                validationRules={[{ type: 'required' }]}
                editorOptions={{
                  showClearButton: true
                  // onValueChanged: ({ value }) => setZakokrW(value)
                }}
              />
              <Item
                dataField="ZaokraglenieSposob"
                editorOptions={{
                  showClearButton: true,
                  dataSource:
                    getEnumZaokraglenia && getEnumZaokraglenia !== null
                      ? getEnumZaokraglenia
                      : null,
                  displayExpr: 'name',
                  text: 'Ddsa',
                  valueExpr: 'id'
                  // onValueChanged: ({ value }) => setZakokrW(value)
                }}
                editorType="dxSelectBox"
                validationRules={[{ type: 'required' }]}
              />
            </Item>
            <Item itemType="group">
              <div className="form">
                <div className="dx-fieldset">
                  <div className="dx-field">
                    <div className="dx-field-label">Kwota z PLN: </div>
                    <div className="dx-field-value">
                      <NumberBox onValueChanged={handleInput} />
                      <Button
                        useSubmitBehavior={false}
                        icon="edit"
                        onClick={calculateWalute}
                      />
                    </div>
                  </div>
                </div>
                <div className="dx-fieldset">
                  <div className="dx-field">
                    <div className="dx-field-label">Wynik: </div>
                    <div className="dx-field-value">25 EUR</div>
                  </div>
                </div>
              </div>
            </Item>
          </Form>
        </Editing>
        <Column
          caption="Actions"
          type="buttons"
          alignment="center"
          width={120}
          fixed
        />
        <Column dataField="Nazwa" width={500} />
        <Column dataField="Opis" />
        <Column
          dataField="CenaModyfikacjaProcent"
          caption="Cena Modyfikacja Procent"
        />
        <Column
          dataField="zaokraglenieWspolczynik"
          caption="Zaokraglenie współczynik"
        />
        <Column dataField="WalutaId" visible={false} />
      </XDataGrid>
    </section>
  );
};

export default Cenniki;
