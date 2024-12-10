import os
import paramiko
from base64 import decodebytes

# SFTP connection details from environment variables
SFTP_HOST = "sftp.iowa.uiowa.edu"
SFTP_USERNAME = os.getenv("HAWKID") 
SFTP_PASSWORD = os.getenv("HAWKID_PASSWORD")
REMOTE_DIRECTORY = f"myweb/{SFTP_USERNAME}"
BUILD_DIRECTORY = "Website/web-build"

# i generated this key running the following command in the terminal:
# ssh-keyscan -t rsa sftp.iowa.uiowa.edu
HOST_KEY = "AAAAB3NzaC1yc2EAAAADAQABAAABAQC5jEjyElNE8eENpIttSD+cXe/FZQpoXOdTTJVHjg+QZLWjedspjZ9npo2yc1j1eDyyMtOYBQEAh/PW1wN8n7qvnczgtFazIIMzEqUAQ+axK2q0h8KiPK3Uq+s86SCMkIaSxWXf25QfUpkN+5OkUSI6cqMLYPekrtgq9aNDK7LH2GUhdBJ4A5RSb6p7lhj57licxxssD/EfDGDBSwOroJG9dgzBLIcNBP0/KjWT6m9N02bKbJQ35VI2TflYjfPAebXaXMGmrbapLHD1dmd1Aj42/FfO76UdANo9LaX2Gs8Wi+qGlCC3CEIGIGGfk3QOa4GOZgp250DkJKNxaSfrFz4J"

def upload_directory(sftp, local_path, remote_path):
    """
    Uploads the build directory to the remote Uiowa MyWeb server using SFTP
    """

    for root, dirs, files in os.walk(local_path):
        # Create remote directories
        for directory in dirs:
            local_dir_path = os.path.join(root, directory)
            remote_dir_path = os.path.join(remote_path, os.path.relpath(local_dir_path, local_path))
            try:
                # make directory if it doesn't exist already
                sftp.mkdir(remote_dir_path)
                print(f"Created remote directory: {remote_dir_path}")
            except IOError:
                print(f"Remote directory already exists: {remote_dir_path}")

        # Upload files and overwrite
        for file in files:
            local_file_path = os.path.join(root, file)
            remote_file_path = os.path.join(remote_path, os.path.relpath(local_file_path, local_path))
            try:
                # Remove existing file before uploading
                sftp.remove(remote_file_path)
                print(f"Removed existing file: {remote_file_path}")
            except IOError:
                print(f"No existing file to remove: {remote_file_path}")
            sftp.put(local_file_path, remote_file_path)
            print(f"Uploaded file: {remote_file_path}")

def main():
    if not SFTP_USERNAME or not SFTP_PASSWORD:
        raise Exception("Environment variables HAWKID and HAWKID_PASSWORD must be set.")

    # Create an SFTP connection
    transport = paramiko.Transport((SFTP_HOST, 22))
    transport.connect(username=SFTP_USERNAME, password=SFTP_PASSWORD)

    decoded_key = decodebytes(HOST_KEY.encode())
    host_key = paramiko.RSAKey(data=decoded_key)

    # Verify host key matches
    remote_host_key = transport.get_remote_server_key()
    if remote_host_key != host_key:
        raise Exception("Host key verification failed!")

    sftp_client = paramiko.SFTPClient.from_transport(transport)

    upload_directory(sftp_client, BUILD_DIRECTORY, REMOTE_DIRECTORY)
    sftp_client.close()
    transport.close()

if __name__ == "__main__":
    try:
        main()
        print("Upload successful.")
    except Exception as e:
        print(f"An error occurred: {e}")
