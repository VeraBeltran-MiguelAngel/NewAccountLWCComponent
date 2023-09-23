public with sharing class createAcc1 {
  // se necesita esta clase para que la funcion se accesible desde el LWC
  /**Como vas a crear un registro de tipo cuenta nuestro argumento
   *  debe ser de ese tipo , la clase tambien hace referecnia a los objetos de
   * salesforce*/
  @AuraEnabled
  public static Account createAccount(Account acc) {
    //con esta funcion se crea el registro
    try {
      insert acc;
      return acc;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
