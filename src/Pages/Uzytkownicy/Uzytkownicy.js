import React from 'react';
import XDataGrid from '../../components/XDataGrid/XDataGrid';
import { Column, Editing, Form, Popup } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import { uzytkownicyBackofficeDataSource } from '../../api/uzytkownicyBackoffice';
import { XPasswordGenerator } from '../../components/XPasswordGenerator/XPasswordGenerator';
import { useSelector } from 'react-redux';

// styles
import './Uzytkownicy.scss';

// api
const dataSource = uzytkownicyBackofficeDataSource();

const Uzytkownicy = () => {
  const { roles } = useSelector((state) => ({
    roles: state.uzytkownicy_Rola
  }));

  const onContentReady = (e) => {
    e.component.columnOption('command:edit', 'visibleIndex: 2');
  };

  const onError = (e) => {
    return e;
  };

  return (
    <>
      <XDataGrid
        dataSource={dataSource}
        onContentReady={onContentReady}
        onDataErrorOccurred={onError}
      >
        <Editing allowUpdating mode="popup" allowDeleting allowAdding>
          <Form labelLocation="top" />
          <Popup showTitle title="Edycja" />
          <Form>
            <Item itemType="group" colCount={2} colSpan={2}>
              <Item
                dataField="Login"
                validationRules={[{ type: 'required' }]}
              />

              <Item dataField="Imie" />

              <Item dataField="Nazwisko" />

              <Item
                dataField="Email"
                validationRules={[
                  { type: 'email', message: 'Podaj poprawny adres e-mail' }
                ]}
              />

              <Item dataField="Telefon" />

              <Item
                dataField="HasloNowe"
                editorOptions={{ mode: 'password', name: 'password' }}
                validationRules={[{ type: 'required' }]}
              />

              <Item
                editorType={'dxButton'}
                editorOptions={{
                  text: 'Wygeneruj hasło',
                  onClick: () => {
                    const input = document.querySelector(
                      'input[name="password"]'
                    );
                    input.value = new XPasswordGenerator().generate(16);

                    window.localStorage.setItem(
                      'generatePassword',
                      new XPasswordGenerator().generate(16)
                    );

                    input.type = 'text';
                  }
                }}
              />
            </Item>

            <Item
              itemType="group"
              caption="Rola użytkownika"
              colSpan={2}
              colCount={roles.length}
            >
              {roles.map((e) => {
                return (
                  <Item
                    key={e.id}
                    label={{ text: e.name, location: 'left' }}
                    dataField={`rola_${e.id}`}
                    editorType="dxCheckBox"
                  />
                );
              })}
            </Item>
          </Form>
        </Editing>
        <Column
          caption="Ustawienia"
          type="buttons"
          alignment="left"
          width={150}
        />
        <Column dataField="Login" />
        <Column dataField="Imie" />
        <Column dataField="Nazwisko" />
        <Column dataField="Email" />
        <Column dataField="Telefon" />
        <Column dataField="Id" />
        <Column dataField="HasloNowe" visible={false} />
        {roles.map((e) => (
          <Column key={e.id} dataField={`rola_${e.id}`} visible={false} />
        ))}
      </XDataGrid>
    </>
  );
};

export default Uzytkownicy;
