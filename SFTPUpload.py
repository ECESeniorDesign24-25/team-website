import os
import paramiko
from base64 import decodebytes

# SFTP connection details from environment variables
SFTP_HOST = "sftp.iowa.uiowa.edu"
SFTP_USERNAME = os.getenv("HAWKID")
SFTP_PASSWORD = os.getenv("HAWKID_PASSWORD")
REMOTE_DIRECTORY = f"myweb/jbkrueger"
LOCAL_DIRECTORY = "/Users/josephkrueger/college/2024_fall/senior_design/team-website/Website/web-build"
HOME_PAGE = "index.html"

# Host key (replace this with the actual key you obtained)
HOST_KEY = "AAAAB3NzaC1yc2EAAAADAQABAAABAQC5jEjyElNE8eENpIttSD+cXe/FZQpoXOdTTJVHjg+QZLWjedspjZ9npo2yc1j1eDyyMtOYBQEAh/PW1wN8n7qvnczgtFazIIMzEqUAQ+axK2q0h8KiPK3Uq+s86SCMkIaSxWXf25QfUpkN+5OkUSI6cqMLYPekrtgq9aNDK7LH2GUhdBJ4A5RSb6p7lhj57licxxssD/EfDGDBSwOroJG9dgzBLIcNBP0/KjWT6m9N02bKbJQ35VI2TflYjfPAebXaXMGmrbapLHD1dmd1Aj42/FfO76UdANo9LaX2Gs8Wi+qGlCC3CEIGIGGfk3QOa4GOZgp250DkJKNxaSfrFz4J"

def upload_files():
    # Check if environment variables are set
    if not SFTP_USERNAME or not SFTP_PASSWORD:
        raise Exception("Environment variables HAWKID and HAWKID_PASSWORD must be set.")

    # Create an SFTP client
    transport = paramiko.Transport((SFTP_HOST, 22))
    transport.connect(username=SFTP_USERNAME, password=SFTP_PASSWORD)

    # Add host key for verification
    decoded_key = decodebytes(HOST_KEY.encode())
    host_key = paramiko.RSAKey(data=decoded_key)

    # Verify host key matches
    remote_host_key = transport.get_remote_server_key()
    if remote_host_key != host_key:
        raise Exception("Host key verification failed!")

    # Create the SFTP session
    sftp = paramiko.SFTPClient.from_transport(transport)
    print(f"Current remote directory: {sftp.getcwd()}")

    # Upload all files from the local directory
    for root, _, files in os.walk(LOCAL_DIRECTORY):
        for file in files:
            local_path = os.path.join(root, file)
            remote_path = f"{REMOTE_DIRECTORY}/{file}"

            print("local_path", local_path)
            print("remote_path", remote_path)

            # Ensure home page file is present
            if file == HOME_PAGE:
                print(f"Uploading home page file: {file}")

            print(f"Uploading {file} to {REMOTE_DIRECTORY}")
            sftp.put(local_path, remote_path)
            print(f"Uploaded {file} to {REMOTE_DIRECTORY}")

    print("All files uploaded successfully.")
    sftp.close()
    transport.close()

if __name__ == "__main__":
    try:
        upload_files()
    except Exception as e:
        print(f"An error occurred: {e}")
