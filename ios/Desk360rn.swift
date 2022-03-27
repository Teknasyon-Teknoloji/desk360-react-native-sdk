import Foundation
import Desk360

@objc(Desk360rn)
class Desk360rn: NSObject {

    var hasInitialized: Bool = false;
    
    @objc(start:)
    func start(desk360Properties: NSDictionary) {
        do {
            //var jsonData: NSData = try JSONSerialization.data(withJSONObject: desk360Properties, options: JSONSerialization.WritingOptions.prettyPrinted) as NSData
            var desk360Environment : Desk360Environment;
            if (desk360Properties["environment"] as? Int == 0){
                desk360Environment = .sandbox
            }
            else{
                desk360Environment = .production
            }
            let credentials = desk360Properties["userCredentials"] as? NSDictionary
            let props = Desk360Properties(
                appID: desk360Properties["appID"] as? String ?? "",
                deviceID: desk360Properties["deviceID"] as? String ?? "",
                environment: desk360Environment,
                language: desk360Properties["languageCode"] as? String ?? "",
                country: desk360Properties["countryCode"] as? String ?? "",
                userCredentials: credentials==nil ? nil : .init(name: credentials?["userName"] as? String ?? "" , email: credentials?["email"] as? String ?? ""),
                bypassCreateTicketIntro: desk360Properties["bypassCreateTicketIntro"] as? Bool ?? false,
                jsonInfo: desk360Properties["jsonInfo"] as? [String:Any]
                )
            hasInitialized = true
            Desk360.start(using: props)
        } catch {
            print(error.localizedDescription)
        }
    }
    
    @objc(show:)
    func show(animated: Bool) {
        DispatchQueue.main.async {
            let topController = (UIApplication.shared.delegate?.window??.rootViewController)!;
            Desk360.show(on: topController, animated: animated)
        }
    }
    
    @objc(setPushToken:)
    func setPushToken(token: String) {
        Desk360.setPushToken(deviceToken: token.data(using: .utf8));
    }
    
    @objc(applicationLaunchChecker:)
    func applicationLaunchChecker(launchOptions: [UIApplication.LaunchOptionsKey: Any]?) {
        Desk360.applicationLaunchChecker(launchOptions);
    }
    
    @objc(applicationUserInfoChecker:)
    func applicationUserInfoChecker(launchOptions: [UIApplication.LaunchOptionsKey: Any]?) {
        Desk360.applicationUserInfoChecker(launchOptions);
    }
    
    @objc(willNotificationPresent:)
    func willNotificationPresent(data: [AnyHashable: Any]) {
        Desk360.willNotificationPresent(data);
    }
    
    @objc(showWithPushDeeplink)
    func showWithPushDeeplink() {
        DispatchQueue.main.async {
            let topController = (UIApplication.shared.delegate?.window??.rootViewController)!;
            Desk360.showWithPushDeeplink(on: topController)
        }
    }
    
    @objc(getUnreadTickets:withRejecter:)
    func getUnreadTickets(resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) {
        Desk360.getUnreadTickets(completion: {results in
            switch results {
                case .failure(let error):
                    reject("Desk360rn",error.localizedDescription,error)
                case .success(let tickets):
                    var items = [[String:Any]]();
                    for model in tickets {
                        do{
                            let data = try JSONEncoder().encode(model)
                            let dictionary = try JSONSerialization.jsonObject(with: data, options: .allowFragments) as! [String: Any]
                            items.append(dictionary);
                        }catch {
                            reject("Desk360rn",error.localizedDescription,error)
                        }
                    }
                    resolve(items);
                }
        });
    }
    
    @objc(ticketDetailsViewController:)
    func ticketDetailsViewController(ticket: NSDictionary) {
        do{
            let data = try JSONSerialization.data(withJSONObject: ticket, options: .prettyPrinted)
            let ticketData = try JSONDecoder().decode(Ticket.self, from: data)
            let detailsViewController = Desk360.ticketDetailsViewController(ofTicket: ticketData);
            DispatchQueue.main.async {
                let topController = (UIApplication.shared.delegate?.window??.rootViewController)!;
                topController.present(detailsViewController, animated: false, completion: nil)
            }
        }catch {
            print("Desk360rn:could not decode ticketdata in ticketDetailsViewController");
        }
    }
    
    @objc(showDetails:withAnimated:)
    func showDetails(ticket: NSDictionary, animated: Bool) {
        do{
            let data = try JSONSerialization.data(withJSONObject: ticket, options: .prettyPrinted)
            let ticketData = try JSONDecoder().decode(Ticket.self, from: data)
            DispatchQueue.main.async {
                let topController = (UIApplication.shared.delegate?.window??.rootViewController)!;
                Desk360.showDetails(ofTicket: ticketData, on: topController, animated: animated);
            }
        }catch {
            print("Desk360rn:could not decode ticketdata in showDetails");
        }
    }
}
