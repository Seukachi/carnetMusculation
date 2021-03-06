package com.muscu.carnetMusculation.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity 
@Table(name="exercice")
@NamedNativeQueries({
	@NamedNativeQuery(name = "exercice.findAll", query = "select * from Exercice e ", resultClass = Exercice.class),
	@NamedNativeQuery(name = "exercice.findById", query = "select * from Exercice e where e.id = :id", resultClass = Exercice.class),
	@NamedNativeQuery(name = "exercice.deleteById", query = "delete from Exercice e where e.id in :id"),
})
public class Exercice {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;

	@Column(name="nom", length=50, nullable=false, unique=false)
	private String nom;

	@Column(name="muscle")
	private String muscle;

	@OneToMany(mappedBy = "exercice")
	private List<EntrainementExercice> details;
	
	@OneToMany(mappedBy = "exercice")
	private List<Serie> series;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getMuscle() {
		return muscle;
	}

	public void setMuscle(String muscle) {
		this.muscle = muscle;
	}
}
