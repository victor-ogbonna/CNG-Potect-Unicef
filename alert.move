module cng_protect::alert {
    use std::signer;

    struct DangerAlert has key {
        gas_level: u64,
        temperature: u64,
    }

    public entry fun log_danger(account: &signer, gas_level: u64, temperature: u64) acquires DangerAlert {
        let account_addr = signer::address_of(account);
        
        if (exists<DangerAlert>(account_addr)) {
            let old_alert = borrow_global_mut<DangerAlert>(account_addr);
            old_alert.gas_level = gas_level;
            old_alert.temperature = temperature;
        } else {
            move_to(account, DangerAlert {
                gas_level,
                temperature,
            });
        }
    }
}
