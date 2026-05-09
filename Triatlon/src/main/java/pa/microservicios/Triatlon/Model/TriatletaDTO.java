/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pa.microservicios.Triatlon.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;

/**
 *
 * @author Asus Entidad del modelo Triatleta con los siguientes atributos:
 * 
 * urlFoto
 * categoria
 * modalidadCross
 * especialidad
 * fechaNacimiento  
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "triatleta")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TriatletaDTO extends Persona {
    
    @NotBlank
    @Column(name = "url_foto", nullable = false, unique = false, length = 200)
    String urlFoto;

    @NotBlank
    @Column(name = "categoria", nullable = false, unique = false, length = 30)
    String categoria;

    @NotBlank
    @Column(name = "modalidad_cross", nullable = false, unique = false, length = 2)
    String modalidadCross;

    @NotBlank
    @Column(name = "especialidad", nullable = false, unique = false, length = 20)
    String especialidad;

    @Column(name = "fecha_nacimiento", nullable = false, unique = false)
    LocalDate fechaNacimiento;

    public TriatletaDTO(String urlFoto, String categoria, String modalidadCross, String especialidad, LocalDate fechaNacimiento, Long id, String nombre, Integer edad, String identificacion, String correo, String genero, Boolean activo) {
        super(id, nombre, edad, identificacion, correo, genero, activo);
        this.urlFoto = urlFoto;
        this.categoria = categoria;
        this.modalidadCross = modalidadCross;
        this.especialidad = especialidad;
        this.fechaNacimiento = fechaNacimiento;
    }

}
