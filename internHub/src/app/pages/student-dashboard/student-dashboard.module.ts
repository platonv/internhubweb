import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { StudentDashboardComponent } from './student-dashboard.component';
import { routing }       from './student-dashboard.routing';

import { PieChart } from './pieChart';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    PieChart,
    Todo,
    Calendar,
    StudentDashboardComponent
  ],
  providers: [
    CalendarService,
    PieChartService,
    TodoService
  ]
})
export class StudentDashboardModule {}