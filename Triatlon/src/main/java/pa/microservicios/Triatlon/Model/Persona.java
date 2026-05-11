/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pa.microservicios.Triatlon.Model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 *
 * @author Asus
 * Clase padre para garantizar la flexibilidad del software digamos
 * para una futura entidad a registrar
 */
@Data //Getters y Setters
@FieldDefaults(level = AccessLevel.PRIVATE) //Todos los atributos de nivel de acceso privado
@AllArgsConstructor //Constructor con todos los atributos
@NoArgsConstructor //Constructor vacio
@MappedSuperclass //Super clase a mapear en los dto's
public class Persona {

    @Id //Llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Llave primaria 
    Long id;

    @NotBlank //No puede ser vacia
    //Nombre de la columna, no puede ser nula, no es unica, de tamaño 50 VarChar
    @Column(name = "nombre", nullable = false, unique = false, length = 50)
    String nombre;

    @NotNull //No puede ser nulo, en este caso no aplica el @NotBlank porque este es un valor numerico entero
    @Column(name = "fecha_nacimiento", nullable = false, unique = false, length = 50)
    LocalDate fechaNacimiento;

    @NotBlank
    @Column(name = "identificacion", nullable = false, unique = true, length = 50)
    String identificacion;

    @NotBlank
    @Email //Le decimos a Spring que será una direccion de correo
    @Column(name = "correo", nullable = false, unique = false, length = 200)
    String correo;

    @NotBlank
    @Column(name = "genero", nullable = false, unique = false)
    String genero;

    @Column(name = "activo", nullable = false)
    Boolean activo;

}
