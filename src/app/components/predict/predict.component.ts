import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css'],
  standalone: true,  // ✅ Ensure this if it's a standalone component
  imports: [CommonModule, ReactiveFormsModule],
})
export class PredictComponent {
  predictForm: FormGroup;
  stressLevel: number | null = null;
  showRecommendations: boolean = false;

  inputFields = [
    { id: 'anxiety_level', label: 'Anxiety Level (0-20)', min: 0, max: 20 },
    { id: 'mental_health_history', label: 'Mental Health History (0-5)', min: 0, max: 5 },
    { id: 'depression', label: 'Depression (0-25)', min: 0, max: 25 },
    { id: 'headache', label: 'Headache (0-7)', min: 0, max: 7 },
    { id: 'sleep_quality', label: 'Sleep Quality (0-7)', min: 0, max: 7 },
    { id: 'breathing_problem', label: 'Breathing Problem (0-5)', min: 0, max: 5 },
    { id: 'living_conditions', label: 'Living Conditions (0-5)', min: 0, max: 5 },
    { id: 'academic_performance', label: 'Academic Performance (0-5)', min: 0, max: 5 },
    { id: 'study_load', label: 'Study Load (0-5)', min: 0, max: 5 },
    { id: 'future_career_concerns', label: 'Future Career Concerns (0-5)', min: 0, max: 5 },
    { id: 'extracurricular_activities', label: 'Extracurricular Activities (0-5)', min: 0, max: 5 }
  ];

  constructor(private fb: FormBuilder) {
    this.predictForm = this.fb.group(
      this.inputFields.reduce((acc, field) => {
        acc[field.id] = ['', Validators.required];
        return acc;
      }, {} as { [key: string]: any })
    );
  }
  playMusic() {
    const audio = document.getElementById('calmMusic') as HTMLAudioElement;
    audio.play();
  }
  showYoga = false;
  showMeditation = false;

  predictStress() {
    if (this.predictForm.valid) {
      const values = this.predictForm.value;
      this.stressLevel = Object.values(values).reduce((acc: number, val: unknown) => acc + Number(val), 0);
      this.showRecommendations = true;
    }
  }
}
