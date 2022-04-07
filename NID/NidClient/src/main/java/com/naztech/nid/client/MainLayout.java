package com.naztech.nid.client;

import java.util.Optional;

import com.ibm.as400.util.commtrace.Header;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentUtil;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.AppLayout.Section;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.html.Footer;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.H4;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.Nav;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.UnorderedList;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.PWA;

@Route(value = "NID")
//@PWA(name = "Project Base for Vaadin Flow with Spring", shortName = "Project Base")
public class MainLayout extends AppLayout{
	private final Tabs menu;
    private H4 viewTitle;
    H3 mainTitle = new H3("NID Service");
    
    
    
    public MainLayout() {
    	
    	mainTitle.setId("main-title");
    	
    	
//    	Image image = new Image("https://www.tbsnews.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2019/09/11/community_bank_logo_final_converted_0.jpg?itok=5c-xipAl", "My Project logo");
//        image.setId("title-image");
//    	image.getStyle().set("height", "60px").set("width", "120px");
    	
        // Use the drawer for the menu
        setPrimarySection(Section.NAVBAR);

        // Make the nav bar a header
        addToNavbar(true, createHeaderContent());

        // Put the menu in the drawer
        menu = createMenu();
        addToDrawer(createDrawerContent(menu));
    }
    
 
    private Component createHeaderContent() {
        HorizontalLayout layout = new HorizontalLayout();

        // Configure styling for the header
        layout.setId("header");
        //layout.getThemeList().set("dark", true);
        layout.setWidthFull();
        layout.setSpacing(false);
        //layout.getStyle().set("background","#248CCC");
        // Have the drawer toggle button on the left
        //layout.add(new DrawerToggle());

        // Placeholder for the title of the current view.
        // The title will be set after navigation.
        viewTitle = new H4();
        viewTitle.setId("view-title");
        //mainTitle.getStyle().set("margin-left","30%");
        //layout.add(viewTitle);
        layout.add(mainTitle);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        // A user icon
        //layout.add(new Image("Vaadin_Logo.png", "Avatar"));
        
        return layout;
    }

    private Component createDrawerContent(Tabs menu) {
        VerticalLayout layout = new VerticalLayout();

        // Configure styling for the drawer
        layout.setSizeFull();
        //layout.getThemeList().set("dark", true);
        layout.getStyle().set("background","#ffffff");
        layout.setPadding(false);
        layout.setSpacing(false);
        layout.getThemeList().set("spacing-s", true);
        layout.setAlignItems(FlexComponent.Alignment.STRETCH);

        // Have a drawer header with an application logo
        HorizontalLayout logoLayout = new HorizontalLayout();
        logoLayout.setId("logo");
        logoLayout.setAlignItems(FlexComponent.Alignment.CENTER);
        
        
//        File file = new File("C:\\Git\\Projects\\CIB\\gui\\CibReportingClient\\src\\main\\resources");
//        Image image = new Image(new StreamResource("vaadin-logo.png", new InputStreamFactory() {
//            @Override
//            public InputStream createInputStream() {
//                try {
//                    return new FileInputStream(file);
//                } catch (FileNotFoundException e) {
//                    e.printStackTrace();
//                }
//                return null;
//            }
//        }), "alt text");
//        logoLayout.add(image);
        logoLayout.add(new H2());
        logoLayout.getStyle().set("padding-left", "20px");
        // Display the logo and the menu in the drawer
        layout.add(logoLayout, menu);
        return layout;
    }

    private Tabs createMenu() {
        final Tabs tabs = new Tabs();
        tabs.setOrientation(Tabs.Orientation.VERTICAL);
        tabs.addThemeVariants(TabsVariant.LUMO_SMALL);
        
        tabs.setId("tabs");
        tabs.add(createMenuItems());
        tabs.getStyle().set("color", "#000000");
        return tabs;
    }

    private Component[] createMenuItems() {
        return new Tab[]{
            createTab(VaadinIcon.BAR_CHART,"SEARCH NID", SearchNid.class),
            createTab(VaadinIcon.LIST_UL,"REQUEST HISTORY", SearchNid.class),
//            createTab(VaadinIcon.RECORDS,"BUSINESS CONFIGURATION", ContractCode.class),
//            createTab(VaadinIcon.COG,"SYSTEM CONFIGURATION", Dashboard.class),
//            createTab(VaadinIcon.USER,"USER PROFILE", Dashboard.class),
            
        };
    }

    private static Tab createTab(VaadinIcon viewIcon,String text, Class<? extends Component> navigationTarget) {
        final Tab tab = new Tab();
        Icon icon = viewIcon.create();
//        icon.getStyle()
//                .set("box-sizing", "border-box")
//                .set("margin-inline-end", "var(--lumo-space-m)")
//                .set("margin-inline-start", "var(--lumo-space-xs)")
//                .set("padding", "var(--lumo-space-xs)");
        RouterLink link = new RouterLink(text, navigationTarget);
        tab.add(icon,link);
        ComponentUtil.setData(tab, Class.class, navigationTarget);
        return tab;
    }

    @Override
    protected void afterNavigation() {
        super.afterNavigation();

        // Select the tab corresponding to currently shown view
        getTabForComponent(getContent()).ifPresent(menu::setSelectedTab);

        // Set the view title in the header
        viewTitle.setText(getCurrentPageTitle());
    }

    private Optional<Tab> getTabForComponent(Component component) {
        return menu.getChildren().filter(tab -> ComponentUtil.getData(tab, Class.class).equals(component.getClass()))
                .findFirst().map(Tab.class::cast);
    }

    private String getCurrentPageTitle() {
        return getContent().getClass().getAnnotation(PageTitle.class).value();
    }
	
}


