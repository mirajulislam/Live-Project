package com.naztech.nid.client;

import com.naztech.nid.model.RecentSearchModel;
import com.naztech.nid.model.ResultModel;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
@CssImport(value = "styles/Styles.css")
@PageTitle("NID History")
@Route(value="history", layout = MainLayout.class)
public class RequestHistory extends Div {
	
	static Grid<ResultModel> grid_1;
	public RequestHistory() {
		
		//Title --start
		Div titleText = new Div();
		titleText.setClassName("text-field");
		HorizontalLayout TextLayout = new HorizontalLayout();
		H3 searchText = new H3("NID Search");
		searchText.getStyle().set("text-decoration", "underline");
		TextLayout.add(searchText);
		TextLayout.setAlignItems(FlexComponent.Alignment.CENTER);
		TextLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);
		TextLayout.getStyle().set("margin", "0px 0px 0px 0px");
		//Title --End
		
		
		
		//from text Fields --start
		Div fromBar = new Div();
		fromBar.setClassName("search");
		HorizontalLayout fromBarLayout = new HorizontalLayout();
		
		
		ComboBox comboBox = new ComboBox("Searched From");
		
		DatePicker fromDate = new DatePicker("From Date");
		DatePicker toDate = new DatePicker("To Date");
		
		
		
		comboBox.setClassName("text-field");
		fromDate.setClassName("text-field");
		toDate.setClassName("text-field");
		
		
		comboBox.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
		
		fromDate.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
		toDate.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
	
		
		fromBarLayout.getStyle().set("margin", "10px 0px 0px 0px");
		fromBarLayout.add(comboBox,fromDate,toDate);
		
		//from text Fields --End
		
		
		
		//SearchBar text Fields --start
				Div searchBar = new Div();
				searchBar.setClassName("search");
				HorizontalLayout searchBarLayout = new HorizontalLayout();
				
				
				ComboBox comboBox2 = new ComboBox("Search Condition");
				TextField nid = new TextField("NID");
				DatePicker date = new DatePicker("Date of Birth");
				TextField name = new TextField("Name");
				
				
				comboBox2.setClassName("text-field");
				nid.setClassName("text-field");
				date.setClassName("text-field");
				name.setClassName("text-field");
				
				comboBox2.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
				nid.addThemeVariants(TextFieldVariant.LUMO_SMALL);
				date.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
				name.addThemeVariants(TextFieldVariant.LUMO_SMALL);
				
				searchBarLayout.getStyle().set("margin", "10px 0px 0px 0px");
				searchBarLayout.add(comboBox2, nid, date, name);
				
				//SearchBar text Fields --End
				
				
				
				//user Fields --start
				Div userBar = new Div();
				userBar.setClassName("search");
				HorizontalLayout userBarLayout = new HorizontalLayout();
				
				TextField userName = new TextField("Search By UserName");
				ComboBox comboBox3 = new ComboBox("Hit/Miss Status");
				
				
				
				
				
				comboBox3.setClassName("text-field");
				userName.setClassName("text-field");
				
				
				
				comboBox3.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
				
				fromDate.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
				toDate.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
			
				
				userBarLayout.getStyle().set("margin", "10px 0px 0px 0px");
				userBarLayout.add(userName,comboBox3);
				
				//user Fields --End
				
				
				
				//Action Button --Start
				Div actionBtn = new Div();
				actionBtn.setClassName("action-Btn");
				HorizontalLayout actionBtnLayout = new HorizontalLayout();
				
				Button search = new Button("Search",VaadinIcon.SEARCH.create(),  e ->{
					//Do Search Method Here
				});
				
				Button reset = new Button("Reset",VaadinIcon.REFRESH.create(),  e ->{
					//Do Reset Method Here
				});
				search.setClassName("all-btn");
				reset.setClassName("all-btn");
				
				
				
				search.addThemeVariants(ButtonVariant.LUMO_SMALL);
				reset.addThemeVariants(ButtonVariant.LUMO_SMALL);
				
				searchBarLayout.setAlignItems(FlexComponent.Alignment.CENTER);
				actionBtnLayout.setAlignItems(FlexComponent.Alignment.CENTER);
				fromBarLayout.setAlignItems(FlexComponent.Alignment.CENTER);
				
				searchBarLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);
				actionBtnLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);
				fromBarLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);
				actionBtnLayout.getStyle().set("margin", "10px 0px 0px 0px");
				
				actionBtnLayout.add(search,reset);
				//Action Button --End
				
				
				//Grid 1 --Start
				Div gridSection = new Div();
				HorizontalLayout gridsectionLayout = new HorizontalLayout();
				VerticalLayout gridvertical = new VerticalLayout();
				Span textR = new Span("Search Result:");
				textR.getStyle().set("font-size", "16px");
				gridvertical.setSpacing(false);
				
				grid_1 = new Grid<>();
				grid_1.setClassName("my-grid");
				grid_1.setHeight("200px");
				
				
				grid_1.addColumn(ResultModel::getStatus).setWidth("120px").setHeader("Result Status").setSortable(true).setResizable(true);
				grid_1.addColumn(ResultModel::getNid).setWidth("120px").setHeader("NID").setSortable(true).setResizable(true);
				grid_1.addColumn(ResultModel::getDob).setWidth("120px").setHeader("Date of Birth").setSortable(true).setResizable(true);
				grid_1.addColumn(ResultModel::getName).setWidth("120px").setHeader("Name").setSortable(true).setResizable(true);
				grid_1.addColumn(ResultModel::getFatherName).setWidth("120px").setHeader("Father Name").setSortable(true).setResizable(true);
				grid_1.addColumn(ResultModel::getFatherName).setWidth("120px").setHeader("Action");
				
				
				grid_1.addThemeVariants(GridVariant.LUMO_COLUMN_BORDERS,GridVariant.LUMO_COMPACT,GridVariant.LUMO_ROW_STRIPES);
				
				gridsectionLayout.getStyle().set("margin", "0px 50px 0px 50px");
				gridvertical.add(textR,grid_1);
				gridsectionLayout.add(gridvertical);
				//Grid 1 --End
				
				fromBar.add(fromBarLayout);
				searchBar.add(searchBarLayout);
				actionBtn.add(actionBtnLayout);
				userBar.add(userBarLayout);
				gridSection.add(gridsectionLayout);
				add(fromBar,searchBar,actionBtn,gridSection);
		
	}

}
