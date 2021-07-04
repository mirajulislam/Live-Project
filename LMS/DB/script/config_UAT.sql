update T_CONFIGURATION
set tx_value1 = 'http://localhost:8080/Lms-server/finacle/customer'
where tx_group = 'CBS'
and tx_sub_group = 'URL'
and tx_name = 'FINACLE_CUSTOMER_INFO_URL'

update T_CONFIGURATION
set tx_value1 = 'http://localhost:8080/Lms-server/ioffice/customer'
where tx_group = 'CBS'
and tx_sub_group = 'URL'
and tx_name = 'I_OFFICE_CUSTOMER_INFO_URL'



update T_CONFIGURATION
set tx_value1 = 'C:\LMS\file\customer_res.xml'
where tx_group = 'FILE'
and tx_sub_group = 'RESPONSE'
and tx_name = 'FINACLE_CUSTOMER_RES'


update T_CONFIGURATION
set tx_value1 = 'C:\LMS\file\res.xml'
where tx_group = 'FILE'
and tx_sub_group = 'RESPONSE'
and tx_name = 'I_OFFICE_CUSTOMER_RES'