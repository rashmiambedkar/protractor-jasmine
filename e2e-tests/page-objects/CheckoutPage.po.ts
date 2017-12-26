import { browser, by, element, ElementFinder, ElementArrayFinder, Key , ExpectedConditions} from 'protractor';
import { BasePage } from './BasePage.po';
import { SelectWrapper } from '../../helpers/SelectWrapper';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { WebElement } from 'selenium-webdriver';
import { timeout } from '../config/constants';

export class CheckoutPage extends BasePage {

    private submitForm: ElementFinder;
    private firstName : ElementFinder;   
    private lastName : ElementFinder;
    private address: ElementFinder; 
    private address2: ElementFinder;
    private accountCity: ElementFinder;
    private accountState: ElementFinder;
    private accountZip: ElementFinder;
    private accountPhone : ElementFinder;    
    private accountEmail: ElementFinder;
    private confirmEmail: ElementFinder;
    private accountDOB: ElementFinder;
    private datePickerDOB: ElementFinder;    
    private selectGender: ElementFinder;

    private billingAddressIsSameCheckbox: ElementFinder;
    private billingAddress1: ElementFinder;
    private billingAddress1ErrorSet: ElementFinder;
    private billingAddress2: ElementFinder;
    private billingAddress2ErrorSet: ElementFinder;
    private billingCity: ElementFinder;
    private billingCityErrorSet: ElementFinder;
    private selectBillingState: ElementFinder;
    private selectBillingStateErrorSet: ElementFinder;
    private billingZip: ElementFinder;
    private billingZipErrorSet: ElementFinder;
    private errorField : ElementArrayFinder;

    constructor () {        
        super();
        this.submitForm = element(by.xpath('//a[(@class="btn round round orange next")]'));
        this.firstName = element(by.xpath('//label[contains(.,"first name*")]/following-sibling::input'));
        this.lastName = element(by.xpath('//label[contains(.,"last name*")]/following-sibling::input'));
        this.address = element(by.xpath('//label[contains(.,"address*")]/following-sibling::input'));
        this.address2 = element(by.xpath('//label[contains(.,"apt/suite/unit (optional)")]//following-sibling::input'));
        this.accountCity = element(by.xpath('//label[contains(text(),"city*")]/following-sibling::input'));
        this.accountState = element(by.xpath('//select[@id="Account_State"]'));
        this.accountZip = element(by.xpath('//input[@data-val-required="Enter a Zip"]'));
        this.accountPhone = element(by.xpath('//input[@data-val-required="Please enter a Telephone"]'));
        this.accountEmail = element(by.xpath('//input[@data-val-required="Please enter a Email Address"]'));
        this.confirmEmail = element(by.xpath('//input[@data-val-required="Please confirm Email"]'));
        this.accountDOB = element(by.xpath('//label[contains(text(),"date of birth mm/dd/yyyy*")]/following-sibling::input'));
        this.datePickerDOB = element(by.xpath('//div[@class="datepicker datepicker-dropdown dropdown-menu datepicker-orient-left datepicker-orient-top"]'));
        this.selectGender = element(by.css('select#sex'));
        this.billingAddressIsSameCheckbox = element(by.xpath('//label[contains(@for,"Account_UseMailingAddressForBilling")]/following-sibling::input'));
        this.billingAddress1 = element(by.xpath('//label[contains(@for,"billing1")]/following-sibling::input'));
        this.billingAddress1ErrorSet = element(by.css('div.billing-address:nth-child(13) > div:nth-child(2) > p:nth-child(1)'));
        this.billingAddress2 = element(by.xpath('//label[contains(@for,"billing2")]/following-sibling::input'));
        this.billingCity = element(by.xpath('//label[contains(@for,"billingCity")]/following-sibling::input'));
        this.billingCityErrorSet = element(by.css('.billing-address-region > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)'));
        this.selectBillingState = element(by.xpath('//select[@data-val-requiredifnotchecked="Enter a Billing State"]'));
        this.selectBillingStateErrorSet = element(by.css('.billing-address-region > div:nth-child(2) > div:nth-child(2) > p:nth-child(1)'));
        this.billingZip = element(by.xpath('//label[contains(@for,"billingZip")]/following-sibling::input'));
        this.billingZipErrorSet = element(by.css('.billing-address-region > div:nth-child(3) > div:nth-child(2) > p:nth-child(1)'));
        this.errorField = element.all(by.css('p.invalid.show'));
        
    }

    // get (url : string) {
    //     browser.get(url);        
    // }

    enterFirstName(firstName: string) {
        return this.firstName.sendKeys(firstName);
    }

    enterLastName(lastName: string) {
        return this.lastName.sendKeys(lastName);        
    }

    enterAddress1(address: string) {
        return this.address.sendKeys(address);
    }

    enterAddress2(address2: string) {
        return this.address2.sendKeys(address2);
    }

    enterAccountCity(city: string) {
        return this.accountCity.sendKeys(city);
    }

    selectAccountState(state: string) {
        let selectDropDown : SelectWrapper = new SelectWrapper(this.accountState);
        return selectDropDown.selectByText(state);
    }

    enterAccountZipCode(zipCode: string) {        
        return this.accountZip.sendKeys(zipCode);
    }

    enterAccountPhone(phoneNumber: string) {
        return this.accountPhone.sendKeys(phoneNumber);
    }

    enterAccountEmail(emailId: string) {
        return this.accountEmail.sendKeys(emailId);
    }

    confirmYourEmailId(confirmEmailId: string) {
        return this.confirmEmail.sendKeys(confirmEmailId);
    }

    enterAccountDOB(dob: string) {       
        //return this.accountDOB.sendKeys(dob, Key.TAB);
        return  browser.executeScript('document.getElementById("birthDate").setAttribute("value", "' + dob +'")');        
    }

    enterAccountDOBToDevice(dob: string) { 
        return  browser.executeScript('document.getElementById("birthDate").setAttribute("value", "' + dob +'")');
    }

    selectYourGender(gender: string){
        let selectDropDown : SelectWrapper = new SelectWrapper(this.selectGender);
        return selectDropDown.selectByText(gender);
    }

    billingAddressIsSame() {
       return WebElementWrapper.selectCheckBox(this.billingAddressIsSameCheckbox);        
    }

    enterBillingAddress1(address: string) {
        return this.billingAddress1.sendKeys(address);
    }

    enterBillingAddress2(address2: string) {
        return this.billingAddress2.sendKeys(address2);
    }

    enterBillingCity(city: string) {
        return this.billingCity.sendKeys(city);
    }

    selectYourBillingState(state: string) {
        var selectDropDown : SelectWrapper = new SelectWrapper(this.selectBillingState);
        return selectDropDown.selectByValue("Alaska");
        
    }

    enterBillingZipCode(zipCode: string) {
        return this.billingZip.sendKeys(zipCode);
    }

    submitSubscription () {
        //browser.wait(ExpectedConditions.elementToBeClickable(this.submitForm), 80000).then(() => )
        return this.submitForm.click();
    }

    waitForCheckoutPageToBeLoaded() {
        browser.wait(ExpectedConditions.elementToBeClickable(this.submitForm), timeout.DEFAULT)
    }    

    clearAccountDOB() {
        browser.executeScript('document.getElementById("birthDate").setAttribute("value", "")');
    }

    resetFormFields() {
        this.firstName.clear();
        this.lastName.clear();
        this.address.clear();
        this.accountCity.clear();
        this.clearAccountDOB();
        this.accountPhone.clear();
        this.accountZip.clear();
        this.accountEmail.clear();
        this.confirmEmail.clear();
        let selectDropDownGender : SelectWrapper = new SelectWrapper(this.selectGender);
        selectDropDownGender.selectByIndex(0);
        let selectDropDown : SelectWrapper = new SelectWrapper(this.accountState);
        selectDropDown.selectByText("state");
    }

    getErrors() {
        return this.errorField.map((element) => {
            return element.getText();                        
        });
    }
}
