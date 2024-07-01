package com.mbamc.packagemanagerbe.sso;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.impl.DefaultClaims;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.security.KeyFactory;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class SSO {

    String pubkey = null;

    public SSO(String pubkey) {
        this.pubkey = pubkey;
    }

    public Key getPublicKey(String stored) throws GeneralSecurityException, IOException {
        byte[] data = Base64.getDecoder().decode((stored.getBytes()));
        X509EncodedKeySpec spec = new X509EncodedKeySpec(data);
        KeyFactory fact = KeyFactory.getInstance("RSA");
        return fact.generatePublic(spec);
    }

    public Claims validateToken(String access_token) {
        Key publicKey;
        try {
            publicKey = getPublicKey(this.pubkey);
        } catch (Exception ex) {
            return null;
        }

        try {
            Claims claims = Jwts.parser().setSigningKey(publicKey).parseClaimsJws(access_token).getBody();
            return claims;
        } catch (Exception ex) {
            Claims claims = new DefaultClaims();
            claims.put("error", ex.toString());
            return claims;
        }
    }
}
