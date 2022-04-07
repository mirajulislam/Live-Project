
UPDATE T_CONFIGURATION
SET tx_value1 = 'https://finuat-j2ee.cbbl.com:20443/FISERVLET/fihttp'--'http://localhost:8084/finacle/customer', 'https://finuat-j2ee.cbbl.com:20443/FISERVLET/fihttp'
WHERE tx_group = 'CBS'
AND tx_sub_group = 'URL'
AND tx_name = 'FINACLE_CUSTOMER_INFO_URL'



UPDATE T_CONFIGURATION
SET tx_value1 = 'C:\\Apps\\Lms\util\\customer_res.xml'
WHERE tx_group = 'FILE'
AND tx_sub_group = 'RESPONSE'
AND tx_name = 'FINACLE_CUSTOMER_RES'


UPDATE T_CONFIGURATION
SET tx_value1 = 'http://10.71.16.10:801/IOFFFICE-API/'--'http://localhost:8084/ioffice/customer', 'http://10.71.16.10:801/IOFFFICE-API/'
WHERE tx_group = 'CBS'
AND tx_sub_group = 'URL'
AND tx_name = 'I_OFFICE_CUSTOMER_INFO_URL'
--10.71.16.13



