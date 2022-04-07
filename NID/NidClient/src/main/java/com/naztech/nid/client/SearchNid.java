package com.naztech.nid.client;


import javax.swing.InputVerifier;


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
import com.vaadin.flow.component.html.Input;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
@CssImport(value = "styles/Styles.css")
@PageTitle("Search NID")
@Route(value="searchNid", layout = MainLayout.class)
public class SearchNid extends Div{
	
	
	static Grid<ResultModel> grid_1;
	static Grid<RecentSearchModel> grid_2;
	
	
	SearchNid(){
		
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
		
		
		Div titleText2 = new Div();
		titleText2.setClassName("text-field");
		HorizontalLayout TextLayout2 = new HorizontalLayout();
		H3 searchText2 = new H3("Previous Search History");
		searchText2.getStyle().set("text-decoration", "underline");
		TextLayout2.add(searchText2);
		TextLayout2.setAlignItems(FlexComponent.Alignment.CENTER);
		TextLayout2.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);
		TextLayout2.setSpacing(false);
		TextLayout2.getStyle().set("margin", "0px 0px 0px 0px");
		//Title --End
		
		
		
		//SearchBar text Fields --start
		Div searchBar = new Div();
		searchBar.setClassName("search");
		HorizontalLayout searchBarLayout = new HorizontalLayout();
		
		
		ComboBox comboBox = new ComboBox("Search Condition");
		TextField nid = new TextField("NID");
		DatePicker date = new DatePicker("Date of Birth");
		TextField name = new TextField("Name");
		
		
		comboBox.setClassName("text-field");
		nid.setClassName("text-field");
		date.setClassName("text-field");
		name.setClassName("text-field");
		
		comboBox.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
		nid.addThemeVariants(TextFieldVariant.LUMO_SMALL);
		date.getElement().setAttribute("theme", TextFieldVariant.LUMO_SMALL.getVariantName());
		name.addThemeVariants(TextFieldVariant.LUMO_SMALL);
		
		searchBarLayout.getStyle().set("margin", "10px 0px 0px 0px");
		searchBarLayout.add(comboBox, nid, date, name);
		
		//SearchBar text Fields --End
		
		
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
		
		Checkbox checkboxEC = new Checkbox();
		checkboxEC.setLabel("Forcefully Pull From EC");
		
		search.addThemeVariants(ButtonVariant.LUMO_SMALL);
		reset.addThemeVariants(ButtonVariant.LUMO_SMALL);
		
		searchBarLayout.setAlignItems(FlexComponent.Alignment.CENTER);
		actionBtnLayout.setAlignItems(FlexComponent.Alignment.CENTER);
		
		searchBarLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);
		actionBtnLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);
		actionBtnLayout.getStyle().set("margin", "10px 0px 0px 0px");
		
		actionBtnLayout.add(search,reset,checkboxEC);
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
		
		
		//Grid 2 --Start
				Div gridSection2 = new Div();
				HorizontalLayout gridsectionLayout2 = new HorizontalLayout();
				VerticalLayout gridvertical2 = new VerticalLayout();
				Div gridbtn = new Div();
				HorizontalLayout gridBtnLayout = new HorizontalLayout();
				//gridbtn.getStyle().set("margin", "0px 50px 0px 50px");
			
				
				gridBtnLayout.setWidth("100%");
				Span textR2 = new Span("Search Result:");
				textR2.getStyle().set("font-size", "16px");
				
				Button allRequest = new Button("All Request History Serch",e ->{
					//Do Route to page here
				});
				
				allRequest.setClassName("all-btn");
				allRequest.getStyle().set("margin", "10px 0 30px 0");
				
				gridvertical2.setSpacing(false);
				allRequest.addThemeVariants(ButtonVariant.LUMO_SMALL);
				
				gridBtnLayout.setAlignItems(FlexComponent.Alignment.CENTER);
				
				
				grid_2 = new Grid<>();
				grid_2.setClassName("my-grid");
				grid_2.setHeight("320px");
				
				
				grid_2.addColumn(RecentSearchModel::getStatus).setWidth("150px").setHeader("Hit/Miss Status").setSortable(true).setResizable(true);
				grid_2.addColumn(RecentSearchModel::getCondition).setWidth("180px").setHeader("Search Condition").setSortable(true).setResizable(true);
				grid_2.addColumn(RecentSearchModel::getNid).setWidth("200px").setHeader("NID").setSortable(true).setResizable(true);
				grid_2.addColumn(RecentSearchModel::getDob).setWidth("120px").setHeader("Date of Birth").setSortable(true).setResizable(true);
				grid_2.addColumn(RecentSearchModel::getName).setWidth("200px").setHeader("Name").setSortable(true).setResizable(true);
				grid_2.addColumn(RecentSearchModel::getFatherName).setWidth("200px").setHeader("Father Name").setSortable(true).setResizable(true);
				grid_2.addColumn(RecentSearchModel::getLocalDbSaveDate).setWidth("250px").setHeader("Internal DB Save Date").setSortable(true).setResizable(true);
				grid_2.addColumn(RecentSearchModel::getSearchDate).setWidth("120px").setHeader("Search Date").setSortable(true).setResizable(true);
				grid_2.addColumn(RecentSearchModel::getSearchBy).setWidth("120px").setHeader("Searched By").setSortable(true).setResizable(true);
				grid_2.addColumn(RecentSearchModel::getSearchBy).setWidth("120px").setHeader("Action").setSortable(true).setResizable(true);
				
				
				grid_2.addThemeVariants(GridVariant.LUMO_COLUMN_BORDERS,GridVariant.LUMO_COMPACT,GridVariant.LUMO_ROW_STRIPES);
				
				gridSection2.getStyle().set("margin", "0px 50px 0px 50px");
				gridBtnLayout.add(textR2);
				
				gridbtn.add(gridBtnLayout);
				gridvertical2.add(gridbtn,grid_2,allRequest);
				gridsectionLayout2.add(gridvertical2);
				//Grid 2 --End
		
		
		
		//Layout components --start
		
		//Layout components --End
		
		
		//Divs
		titleText.add(TextLayout);
		titleText2.add(TextLayout2);
		searchBar.add(searchBarLayout);
		actionBtn.add(actionBtnLayout);
		gridSection.add(gridsectionLayout);
		gridSection2.add(gridsectionLayout2);
		//Main Page view
		add(titleText,searchBar,actionBtn,gridSection, titleText2,gridSection2);
		
	}

}
