import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {ConfigurationModule} from './configuration.module'

import {AppComponent}   from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, ConfigurationModule], // import forms module
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})

export class AppModule {
}
