public class ciudadController {
  public Ciudad__c miObjeto { get; set; }

  public ciudadController() {
    miObjeto = new Ciudad__c();
  }

  public void guardarMiObjeto() {
    try {
      insert miObjeto;
      ApexPages.addMessage(
        new ApexPages.Message(
          ApexPages.Severity.INFO,
          'Registro guardado con éxito.'
        )
      );
      miObjeto = new Ciudad__c(); // Limpiar el formulario después de guardar.
    } catch (Exception e) {
      ApexPages.addMessage(
        new ApexPages.Message(
          ApexPages.Severity.ERROR,
          'Error al guardar el registro.'
        )
      );
    }
  }
}
