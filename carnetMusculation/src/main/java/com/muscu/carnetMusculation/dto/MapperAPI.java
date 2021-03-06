package com.muscu.carnetMusculation.dto;

import java.time.ZoneId;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.muscu.carnetMusculation.entities.EntrainementExercice;
import com.muscu.carnetMusculation.entities.Entrainement;
import com.muscu.carnetMusculation.entities.Exercice;
import com.muscu.carnetMusculation.entities.Programme;
import com.muscu.carnetMusculation.entities.Seance;
import com.muscu.carnetMusculation.entities.Serie;

@Component
public class MapperAPI {

	static ZoneId defaultZoneId = ZoneId.systemDefault();

	@Autowired
	private  ModelMapper mapper;

	//Programme mapper
	public ProgrammeAPI convertToDto(Programme programme) {
		return mapper.map(programme, ProgrammeAPI.class);
	}

	public Programme convertToEntity(ProgrammeAPI programmeApi) {
		return mapper.map(programmeApi, Programme.class);
	}

	//Details mapper
	public DetailsExerciceAPI convertToDto(EntrainementExercice details) {
		return mapper.map(details, DetailsExerciceAPI.class);
	}

	public EntrainementExercice convertToEntity(DetailsExerciceAPI detailsApi) {
		return mapper.map(detailsApi, EntrainementExercice.class);
	}

	//Entrainement mapper
	public EntrainementAPI convertToDto(Entrainement entrainement) {
		return mapper.map(entrainement, EntrainementAPI.class);
	}

	public Entrainement convertToEntity(EntrainementAPI entrainementApi) {
		return mapper.map(entrainementApi, Entrainement.class);
	}

	//Exercice mapper
	public ExerciceAPI convertToDto(Exercice exercice) {
		return mapper.map(exercice, ExerciceAPI.class);
	}

	public Exercice convertToEntity(ExerciceAPI exerciceApi) {
		return mapper.map(exerciceApi, Exercice.class);
	}

	//Session mapper
	public SeanceAPI convertToDto(Seance session) {
		return mapper.map(session, SeanceAPI.class);
	}

	public Seance convertToEntity(SeanceAPI sessionApi) {
		return mapper.map(sessionApi, Seance.class);
	}

	//Serie mapper
	public SerieAPI convertToDto(Serie serie) {
		return mapper.map(serie, SerieAPI.class);
	}

	public Serie convertToEntity(SerieAPI serieApi) {
		return mapper.map(serieApi, Serie.class);
	}

}

