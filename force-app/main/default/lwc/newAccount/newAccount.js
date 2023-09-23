import { LightningElement, track } from "lwc";
/*Aqui hacemos referencia a los atributos de nuestro objeto */
import NAME_FIELD from "@salesforce/schema/Account.Name";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
//llamanos a la funcion creada en nuestra clase apex 'createAcc1'
import createAccount from "@salesforce/apex/createAcc1.createAccount";
// con esta libreria mostramos los mensajes de confirmacion
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class NewAccount extends LightningElement {
  //decarar los atributos de la clase y usaran los atributos del objeto
  @track name = NAME_FIELD;
  @track industry = INDUSTRY_FIELD;
  @track phone = PHONE_FIELD;

  //aqui estamos asignando los valores en un arreglo de propiedades
  rec = {
    Name: this.name,
    Industry: this.industry,
    Phone: this.phone
  };
  /*Funciones que se utilizan en la plantilla html
  para manejar la entrada de datos, se asignan en los atributos*/
  handleNameChange(event) {
    //a la propiedad(Name) del arreglo rec le ponemos el valor de entrada
    this.rec.Name = event.target.value;
    console.log("name1", this.rec.Name);
  }

  handleIndChange(event) {
    this.rec.Industry = event.target.value;
    console.log("Industry", this.rec.Industry);
  }

  handlePhnChange(event) {
    this.rec.Phone = event.target.value;
    console.log("Phone", this.rec.Phone);
  }

  /**esta funcion es para manejar la insercion de los datos
   * en el objeto */
  handleClick() {
    /**llamamos a la funcion creada dentro de la clase apex
     * como recibe un objeto de tipo cuenta le asignamos el arreglo de propiedades
     */
    createAccount({ acc: this.rec })
      .then((result) => {
        this.message = result;
        this.error = undefined;
        // si el mensaje es diferente de indefinido mostramos el mensaje de exito
        if (this.message !== undefined) {
          this.rec.Name = "";
          this.rec.Industry = "";
          this.rec.Phone = "";
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Success",
              message: "Account created Succesfully",
              variant: "success"
            })
          );
        }

        console.log(JSON.stringify(result));
        console.log("result", this.message);
      })
      // si existe error al insertar mostramos mensaje
      .catch((error) => {
        this.message = undefined;
        this.error = error;
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Failed to Insert record",
            message: error.body.message,
            variant: "error"
          })
        );
        console.log("error", JSON.stringify(this.error));
      });
  }
  //fin de la clase
}
