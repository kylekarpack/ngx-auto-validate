import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgxAutoValidateModule } from "ngx-auto-validate";
import { AppComponent } from "./app.component";


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		NgxAutoValidateModule.forRoot({
			errors: {
				required: () => "Edited required message"
			},
			classes: {
				validationMessage: "text-muted small"
			}
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
