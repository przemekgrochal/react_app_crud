import React from "react";
import { useSelector } from 'react-redux';
import { Column, Editing, Form, Popup } from "devextreme-react/data-grid";
import { Item } from "devextreme-react/form";
import { sklepyDataSource } from "../../../api/sklepy";
import XDataGrid from "../../../components/XDataGrid/XDataGrid";

const dataSource = sklepyDataSource(["Id", "Nazwa"]);

const Sklepy = () => {
  const { ustawienia_JezykTyp } = useSelector((state) => ({
    ustawienia_JezykTyp: state.ustawienia_JezykTyp
  }));

  const onError = (e) => {
    console.log("onError: ", e);
  };

  return (
    <XDataGrid
      dataSource={dataSource}
      options={{
        onDataErrorOccurred: onError
      }}
    >
      <Editing allowUpdating mode="popup" allowDeleting allowAdding>
        <Form labelLocation="top" />
        <Popup showTitle title="Edycja" />
        <Form>
          <Item
            dataField="Nazwa"
            colSpan={2}
            validationRules={[{ type: "required" }]}
          />
          <Item
            itemType="group"
            caption="Języki"
          >
            {ustawienia_JezykTyp.map(({ id, name }) => (
              <Item
                key={id}
                label={{ text: name, location: 'left' }}
                dataField={id}
                editorType="dxCheckBox"
              />
            ))}
          </Item>
        </Form>
      </Editing>

      <Column dataField="Id" />
      <Column dataField="Nazwa" />
      {ustawienia_JezykTyp.map(({ id }) => (
        <Column
          key={id}
          dataField={id}
          visible={false}
        />
      ))}
    </XDataGrid>
  );
};

export default Sklepy;
