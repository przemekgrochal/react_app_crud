import React, { useRef } from 'react';
import { Column, Editing, Form, Popup } from 'devextreme-react/data-grid';
import { Item, TabbedItem, Tab } from 'devextreme-react/form';
import { promocjeDataSource } from '../../../../api/promocje';
import { sklepyDataSource } from '../../../../api/sklepy';
import XDataGrid from '../../../../components/XDataGrid/XDataGrid';

const dataSource = promocjeDataSource();
const sklepySource = sklepyDataSource(['Id', 'Nazwa'], 'SklepId');

const Promocje = () => {
  // const [checkBoxVal, setCheckboxVal] = useState(false);

  // const handleCheckbox = () => {
  //   let newVal = true;

  //   if (checkBoxVal) {
  //     newVal = false;
  //   } else if (checkBoxVal === false) {
  //     newVal = undefined;
  //   }
  //   console.log(newVal);
  //   setCheckboxVal(newVal);
  // };

  // const checkboxVal = useRef(undefined);

  const onError = (e) => {
    console.log('onError: ', e);
  };

  const startDate = useRef(null);
  const endDate = useRef(null);

  const setEditingDates = ({ data }) => {
    const { DataOd, DataDo } = data;

    startDate.current = DataOd;
    endDate.current = DataDo;
  };

  // if next create
  const clearDates = () => {
    startDate.current = null;
    endDate.current = null;
  };

  const allowValueChangedBind = useRef(true);
  const defaultValueHandler = useRef(null);

  const bindDefaultValueHandler = (e) => {
    if (allowValueChangedBind.current) {
      console.log(e.editorOptions);
      defaultValueHandler.current = e.editorOptions.onValueChanged;
      allowValueChangedBind.current = false;
    }
  };

  return (
    <XDataGrid
      dataSource={dataSource}
      onDataErrorOccurred={onError}
      onEditingStart={setEditingDates}
      onEditorPreparing={bindDefaultValueHandler}
    >
      <Editing
        allowUpdating
        mode="popup"
        allowDeleting
        allowAdding
      >
        <Form labelLocation="top" />
        <Popup showTitle title="Edycja" onHidden={clearDates} />
        <Form>
          <TabbedItem colCount={2} colSpan={2}>
            <Tab title="Info">
              <Item
                dataField="SklepId"
                label={{ text: 'Sklep' }}
                colCount={2}
                colSpan={2}
                editorType="dxSelectBox"
                editorOptions={{
                  dataSource: sklepySource,
                  displayExpr: 'Nazwa',
                  text: 'Ddsa',
                  valueExpr: 'Id'
                }}
                validationRules={[{ type: 'required' }]}
              />
              <Item
                dataField="Nazwa"
                validationRules={[{ type: 'required' }]}
              />
              <Item
                dataField="Opis"
                editorType="dxTextArea"
                colSpan={2}
                editorOptions={{ height: 100 }}
              />
              <Item
                dataField="Aktywna"
                editorType="dxCheckBox"
                // editorOptions={{
                //   value: false,
                //   onValueChanged: handleCheckbox
                // }}
              />
              <Item
                itemType="group"
                caption="Właściwości"
                colCount={2}
                colSpan={2}
              >
                <Item
                  dataField="DataOd"
                  editorOptions={{
                    useMaskBehavior: true,
                    showClearButton: true,
                    type: 'datetime',
                    onValueChanged: ({ value }) => startDate.current = value, // bind initial value handler onEditPreparing because value doesnt save
                    displayFormat: 'EEEE, d MMM, yyyy HH:mm'
                  }}
                  validationRules={[{
                      type: 'custom',
                      message: 'Uzupelnij conajmniej 1 date',
                      validationCallback: ({ value }) => value || endDate.current
                    }
                  ]}
                />
                <Item
                  dataField="DataDo"
                  editorOptions={{
                    useMaskBehavior: true,
                    showClearButton: true,
                    type: 'datetime',
                    onValueChanged: ({ value }) => endDate.current = value,
                    displayFormat: 'EEEE, d MMM, yyyy HH:mm'
                  }}
                  validationRules={[{
                    type: 'custom',
                    message: 'Uzupelnij conajmniej 1 date',
                    validationCallback: ({ value }) => value || startDate.current
                  }]}
                />
                <Item
                  dataField="ZmianaCenyProcent"
                  editorOptions={{ format: '#0.00' }}
                  validationRules={[{ type: 'required' }]}
                />
                <Item
                  dataField="ZmianaCenyKwota"
                  editorOptions={{ format: '#0.00' }}
                  validationRules={[{ type: 'required' }]}
                />
              </Item>
            </Tab>
          </TabbedItem>
        </Form>
      </Editing>
      <Column caption="Actions" type="buttons" alignment="left" width={150} />
      
      <Column dataField="SklepNazwa" />
      <Column dataField="Nazwa" />
      <Column dataField="DataOd" />
      <Column dataField="DataDo" />
      <Column dataField="Aktywna" />
      <Column dataField="SklepId" visible={false} />
      <Column dataField="Opis" visible={false} />
      <Column dataField="ZmianaCenyKwota" visible={false} />
      <Column dataField="ZmianaCenyProcent" visible={false} />
    </XDataGrid>
  );
};

export default Promocje;
